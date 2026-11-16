export default defineAppConfig({
  ui: {
    colors: {
      primary: 'freestuff', // palette defined in app/app.css
      neutral: 'zinc',
    },
  },
  seo: {
    title: 'FreeStuff API',
    description: 'Use FreeStuff\'s data to build your own products using Free Games',
  },
  header: {
    title: 'FreeStuff API',
    logo: {
      light: '/logo_black.svg',
      dark: '/logo_white.svg',
      alt: 'FreeStuff',
    },
  },
  socials: {
    x: 'https://x.com/freestuff_bot',
    bluesky: 'https://freestuff.gg/bluesky',
    telegram: 'https://freestuff.gg/telegram',
    github: 'https://github.com/FreeStuffBot',
  },
  github: {
    url: 'https://github.com/FreeStuffBot/docs',
    branch: 'master',
  },
  toc: {
    title: 'On this page',
  },
})
