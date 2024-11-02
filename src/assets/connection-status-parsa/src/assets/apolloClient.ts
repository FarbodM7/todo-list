import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://your-graphql-endpoint.com/graphql', // replace with graphql server url
    cache: new InMemoryCache(),
});

export default client;