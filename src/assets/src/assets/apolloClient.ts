import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://your-graphql-endpoint.com/graphql', // must replace with GraphQL server URL
    cache: new InMemoryCache(),
});

export default client;
