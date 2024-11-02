// src/apolloClient.ts
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://your-graphql-server.com/graphql', // replace with your server URI
    cache: new InMemoryCache(),
});

export default client;
