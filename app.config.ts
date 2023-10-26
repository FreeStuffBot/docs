export default defineAppConfig({
  docus: {
    title: 'FreeStuff API',
    description: 'Use FreeStuff\'s data to build your own products using Free Games',
    image: 'https://user-images.githubusercontent.com/904724/185365452-87b7ca7b-6030-4813-a2db-5e65c785bf88.png',
    socials: {
      twitter: 'freestuff_bot',
      github: 'FreeStuffBot'
    },
    github: {
      dir: 'content',
      branch: 'main',
      repo: 'docs',
      owner: 'FreeStuff',
      edit: true
    },
    aside: {
      level: 0,
      collapsed: false,
      exclude: []
    },
    main: {
      padded: true,
      fluid: true
    },
    header: {
      logo: true,
      showLinkIcon: true,
      exclude: [],
      fluid: true
    }
  }
})
