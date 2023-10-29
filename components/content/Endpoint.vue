<template>
  <div class="endpoint">
    <div class="header" @click="open = !open">
      <span :data-method="data.method.toUpperCase()" v-text="data.method" />
      <span class="route-pre" v-text="v2.base" />
      <span class="route" v-text="data.route" />
      <Icon name="ph:caret-down-bold" />
    </div>
    <div class="content">
      <h4>Parameters</h4>
      <div class="params">
        <span class="title">Location</span>
        <span class="title">Key</span>
        <span class="title">Type</span>
        <span class="title">Description</span>
        <template v-for="p of data.params.map(q => r(q))" :key="p.key">
          <span class="location" v-text="p.location" />
          <span class="key" v-text="p.key" />
          <span class="type" v-text="p.type" />
          <span class="desc" v-text="p.desc" />
        </template>
      </div>

      <h4>Responses</h4>
      <div class="responses">
        <div v-for="res of data.responses.map(q => r(q))" :key="res.code" class="response">
          <div class="title" :data-code="res.code">
            <div class="code" v-text="res.code" />
            <div class="codename" v-text="codeNames[String(res.code)]" />
          </div>

          <span v-text="r(res.desc)" />

          <span class="restype">Body</span>
          <code v-text="JSON.stringify(r(r(res.returns).body), null, 2) || '(none)'" />

          <span class="restype">Headers</span>
          <code>
            <div v-for="line,i of Object.entries(r(r(res.returns).headers)).map(([k, v]) => `${k}=${v}`)" :key="i" class="line">
              <span v-text="line.split('//')[0].replace(/\s+$/, '')" />
              <span v-if="line.includes('//')" class="comment1">&mdash;</span>
              <span v-if="line.includes('//')" v-text="line.split('//')[1]" class="comment2" />
            </div>
            <div v-if="!Object.entries(r(r(res.returns).headers)).length" class="lines">
              <span>(none)</span>
            </div>
          </code>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import v2 from '~/data/api-v2.json'

const props = defineProps<{
  name: keyof typeof v2['endpoints']
}>()

const data = computed(() => v2.endpoints[props.name])

const open = useState(`endpointstate-${props.name}`, () => false)
const openRotate = computed(() => open.value ? '0deg' : '-90deg')
const openHeight = computed(() => open.value ? 'auto' : '0')
const openRel = computed(() => open.value ? '1' : '0')

function r(word: any) {
  if (typeof word !== 'string' || !word.startsWith('@')) return word
  return (v2['@'] as any)[word.slice(1)]
}

const codeNames: Record<string, string> = {
  '1xx': '**Informational**',
  '100': 'Continue',
  '101': 'Switching Protocols',
  '2xx': '**Successful**',
  '200': 'OK',
  '201': 'Created',
  '202': 'Accepted',
  '203': 'Non-Authoritative Information',
  '204': 'No Content',
  '205': 'Reset Content',
  '206': 'Partial Content',
  '3xx': '**Redirection**',
  '300': 'Multiple Choices',
  '301': 'Moved Permanently',
  '302': 'Found',
  '303': 'See Other',
  '304': 'Not Modified',
  '305': 'Use Proxy',
  '307': 'Temporary Redirect',
  '4xx': '**Client Error**',
  '400': 'Bad Request',
  '401': 'Unauthorized',
  '402': 'Payment Required',
  '403': 'Forbidden',
  '404': 'Not Found',
  '405': 'Method Not Allowed',
  '406': 'Not Acceptable',
  '407': 'Proxy Authentication Required',
  '408': 'Request Timeout',
  '409': 'Conflict',
  '410': 'Gone',
  '411': 'Length Required',
  '412': 'Precondition Failed',
  '413': 'Payload Too Large',
  '414': 'URI Too Long',
  '415': 'Unsupported Media Type',
  '416': 'Range Not Satisfiable',
  '417': 'Expectation Failed',
  '418': 'I\'m a teapot',
  '426': 'Upgrade Required',
  '5xx': '**Server Error**',
  '500': 'Internal Server Error',
  '501': 'Not Implemented',
  '502': 'Bad Gateway',
  '503': 'Service Unavailable',
  '504': 'Gateway Time-out',
  '505': 'HTTP Version Not Supported',
  '102': 'Processing',
  '207': 'Multi-Status',
  '226': 'IM Used',
  '308': 'Permanent Redirect',
  '422': 'Unprocessable Entity',
  '423': 'Locked',
  '424': 'Failed Dependency',
  '428': 'Precondition Required',
  '429': 'Too Many Requests',
  '431': 'Request Header Fields Too Large',
  '451': 'Unavailable For Legal Reasons',
  '506': 'Variant Also Negotiates',
  '507': 'Insufficient Storage',
  '511': 'Network Authentication Required',
  '7xx': '**Developer Error**'
}
</script>

<style scoped lang=scss>
.endpoint {
  background-color: var(--elements-backdrop-background);
  border-radius: 10pt;
  border: 1px solid #88888830;
  margin-bottom: 15pt;
  overflow: hidden;
}

.header {
  display: flex;
  border-bottom: inherit;
  padding: 10pt;
  align-items: center;
  cursor: pointer;
  transition: background-color .1s ease;

  &:hover {
    background-color: #8888880b;
  }

  svg {
    transition: rotate .1s ease;
    rotate: v-bind(openRotate);
  }

  [data-method] {
    padding: 2px 8pt;
    border-radius: 999pt;
    border: 1px solid #888888;
    font-size: 10pt;
    font-weight: bolder;
  }

  [data-method="GET"] {
    background-color: #0059ff66;
    border-color: #0059ff;
  }

  .route-pre {
    font-size: 12pt;
    margin-left: 10pt;
    opacity: .4;
  }

  .route {
    font-size: 12pt;
    font-weight: bold;
    flex-grow: 1;
  }
}

.content {
  padding: calc(5pt + v-bind(openRel) * 5pt) 10pt;
  max-height: v-bind(openHeight);
  overflow: hidden;
}

h4 {
  font-weight: bolder;
  font-size: 14pt;
  margin-bottom: 10pt;

  &:not(:first-child) {
    margin-top: 20pt;
  }
}

.params {
  display: grid;
  grid-template-columns: auto auto auto auto;
  gap: 5pt 15pt;

  .title {
    font-size: 9pt;
    font-weight: bolder;
  }

  .location {
    border: 1px solid #88888899;
    padding: 2pt 4pt;
    border-radius: 4pt;
    width: fit-content;
    height: fit-content;
    opacity: .8;
  }

  span:not(.title) {
    min-height: 24pt;
    align-items: center;
    display: flex;
    line-height: 1.2em;
  }

  .key {
    height: fit-content;
  }

  .type {
    font-family: monospace;
    opacity: .8;
    height: fit-content;
  }

  .desc {
    height: fit-content;
    line-break: normal;
    word-wrap: normal;
  }
}

.responses {
  .response {
    background-color: #88888818;
    border-radius: 4pt;
    padding: 10pt;
    margin-top: 5pt;
  }

  .title {
    display: flex;
    align-items: center;
    margin-bottom: 10pt;
    --color: #8acbdf;

    &[data-code^="2"] { --color: #6cd86c; }
    &[data-code^="4"] { --color: #e0588c; }
    &[data-code^="5"] { --color: #dd7133; }

    .code {
      border: 1px solid var(--color);
      border-radius: 999pt;
      display: flex;
      align-items: center;
      line-height: 1em;
      padding: 3pt calc(3pt + .3em) 3pt 3pt;
      gap: 3pt;
      margin-right: 10pt;
      font-weight: bolder;
      font-size: 10pt;
      color: var(--color);

      &::before {
        content: '';
        width: .6em;
        height: .6em;
        margin: .2em;
        display: inline-block;
        border-radius: 999pt;
        background-color: var(--color);
      }
    }
  }

  .codename {
    font-weight: bolder;
    font-size: 11pt;
    opacity: .8;
  }

  .restype {
    font-size: 9pt;
    font-weight: bolder;
    margin: 10pt 0 5pt 0;
    display: block;
  }

  code {
    display: block;
    border: 1px solid #88888833;
    padding: 5pt;
    font-family: monospace;
    border-radius: 2px;

    &:not(:has(.line)) {
      white-space: pre;
    }

    .line {
      display: grid;
      grid-template-columns: auto auto 1fr;
      gap: .8em;
      font-family: monospace;

      span:not([class^="comment"]) { white-space: pre; }
      .comment1 { opacity: .3; }
      .comment2 { opacity: .6; }
    }
  }
}
</style>
