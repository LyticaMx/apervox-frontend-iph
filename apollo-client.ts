import { ApolloClient, InMemoryCache } from "@apollo/client";

// const URI = "https://rickandmortyapi.com/graphql"
const URI = "http://ec2-52-26-247-226.us-west-2.compute.amazonaws.com:8002/graphql"
const client = new ApolloClient({
    uri: URI,
    cache: new InMemoryCache(),
});

export default client;