import { createApp, h, provide } from 'vue'
import App from './App.vue'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient, provideApolloClient } from '@vue/apollo-composable'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import router from './router/index.js'

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'https://test-4hho.onrender.com/graphql',
})
// https://test-4hho.onrender.com/
// http://127.0.0.1:3000/graphql
// Cache implementation
const cache = new InMemoryCache()

// Create the Apollo client
const createApolloClient = (token='') => new ApolloClient({
  link: httpLink,
  cache,
})

const app = createApp({
  setup() {
    provide(DefaultApolloClient, createApolloClient());
    provideApolloClient(createApolloClient());
  },
  render: () => h(App),
})

app.use(router)
app.mount('#app')

