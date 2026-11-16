import v2 from '../../data/api-v2.json'

/*
 * The `:data-model` and `:endpoint` components render from data/api-v2.json in the browser,
 * so the markdown served to agents (/raw/**.md, llms-full.txt) would only contain empty tags.
 * This expands them into plain markdown before the page is stringified.
 */

type Node = string | [string, Record<string, unknown>, ...Node[]]
type Model = { type: string, schema: string[] }
type Endpoint = { method: string, route: string, params: unknown[], responses: unknown[] }
type Param = { location: string, key: string, type: string, desc: string }
type Response = { code: number, desc: string, returns: unknown }
type Returns = { body: unknown, headers: Record<string, string> }

const refs = v2['@'] as Record<string, unknown>
const models = v2.models as Record<string, Model>
const endpoints = v2.endpoints as Record<string, Endpoint>

function r<T>(value: unknown): T {
  return (typeof value === 'string' && value.startsWith('@') ? refs[value.slice(1)] : value) as T
}

const code = (text: string): Node => ['code', {}, text]
const pre = (text: string, language: string): Node => ['pre', { language, code: text }, ['code', {}, text]]

function dataModel(name: string): Node[] {
  const model = models[name]
  if (!model) return []
  return [
    ['p', {}, ['strong', {}, `Data Model ${name}`], ': ', code(model.type)],
    pre(model.schema.join('\n'), 'ts'),
  ]
}

function endpoint(name: string): Node[] {
  const ep = endpoints[name]
  if (!ep) return []
  const params = ep.params.map(p => r<Param>(p))
  const out: Node[] = [
    ['h4', {}, code(`${ep.method.toUpperCase()} ${ep.route}`)],
    ['p', {}, code(`${ep.method.toUpperCase()} ${v2.base}${ep.route}`)],
    ['p', {}, ['strong', {}, 'Parameters']],
    ['ul', {}, ...params.map((p): Node => ['li', {}, code(p.key), ` (${p.location}, `, code(p.type), `): ${p.desc}`])],
    ['p', {}, ['strong', {}, 'Responses']],
  ]
  for (const res of ep.responses.map(x => r<Response>(x))) {
    const returns = r<Returns>(res.returns)
    out.push(['p', {}, code(String(res.code)), ` ${r<string>(res.desc)}`])
    if (returns?.body != null) out.push(pre(JSON.stringify(r(returns.body), null, 2), 'json'))
    const headers = Object.entries(r<Record<string, string>>(returns?.headers) || {})
    if (headers.length) out.push(pre(headers.map(([k, v]) => `${k}: ${v}`).join('\n'), 'http'))
  }
  return out
}

function expand(node: Node): Node[] | null {
  if (typeof node === 'string') return null
  const [tag, props] = node
  if (tag === 'data-model') return dataModel(String(props.name))
  if (tag === 'endpoint') return endpoint(String(props.name))
  // inline components may end up wrapped in a paragraph of their own
  if (tag === 'p') {
    const children = node.slice(2).filter(c => typeof c !== 'string' || c.trim())
    if (children.length === 1) return expand(children[0] as Node)
  }
  return null
}

function walk(nodes: Node[]): Node[] {
  return nodes.flatMap((node) => {
    const expanded = expand(node)
    if (expanded) return expanded
    if (typeof node === 'string') return [node]
    const [tag, props, ...children] = node
    return [[tag, props, ...walk(children)] as Node]
  })
}

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('agent-discovery:document', (_event, page) => {
    if (Array.isArray(page?.body?.value)) page.body.value = walk(page.body.value)
  })
})
