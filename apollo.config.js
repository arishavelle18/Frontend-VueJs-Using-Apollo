// apollo.config.js
module.exports = {
    client: {
      service: {
        name: 'hello-graphql',
        // URL to the GraphQL API
        url: 'https://test-4hho.onrender.com/graphql',
        // https://test-4hho.onrender.com/
        // http://127.0.0.1:3000/graphql
      },
      // Files processed by the extension
      includes: [
        'src/**/*.vue',
        'src/**/*.js',
      ],
    },
  }