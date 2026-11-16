export default defineNuxtConfig({
  // https://docus.dev
  extends: ['docus'],

  site: {
    url: 'https://docs.freestuffbot.xyz',
    name: 'FreeStuff API',
  },

  // Hosted statically on GitHub Pages, so there is no server for the MCP endpoint.
  // (The matching menu entries are removed in app/components/docs/DocsPageHeaderLinks.vue)
  mcp: {
    enabled: false,
  },

  llms: {
    domain: 'https://docs.freestuffbot.xyz',
    title: 'FreeStuff API',
    description: 'FreeStuff provides real-time data about free games, ingame content and discounts. These are the developer docs for the FreeStuff API v2 (REST + webhooks) and its client libraries.',
    full: {
      title: 'FreeStuff API',
      description: 'Complete FreeStuff API v2 developer documentation in a single file.',
    },
  },

  agentDiscovery: {
    llms: {
      details: [
        'Every page is available as plain markdown under `/raw/<path>.md`, e.g. `https://docs.freestuffbot.xyz/raw/api-v2/rest-api.md`.',
        'Use `/llms-full.txt` to get the whole documentation in one request. An index of all pages is at `/sitemap.md`.',
      ],
    },
  },

  nitro: {
    prerender: {
      // Docus disables this; GitHub Pages wants `page/index.html` rather than `page.html`
      // next to a `page/` folder (which holds the payload).
      autoSubfolderIndex: true,
    },
  },

  compatibilityDate: '2025-07-22',
})
