import { ApolloClient, InMemoryCache } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        notificationss: () => {},
        notifications: {
          keyArgs: false,
          merge(existing, incoming) {          
            console.log("🚀 ~ file: apollo-client.ts:12 ~ merge ~ existing:", existing)
            console.log("🚀 ~ file: apollo-client.ts:12 ~ merge ~ incoming:", incoming)
            
            return {
              cursor: incoming.cursor,
              notifications: [
                ...existing?.notifications ?? [],
                ...incoming?.notifications ?? []
              ],
            };
          },
  
          read(existing) {
            if (existing) {
              return {
                cursor: existing.cursor,
                notifications: Object.values(existing.notifications),
              };
            }
          },
        }
      },
    },
  },
});

const URI = "http://ec2-52-26-247-226.us-west-2.compute.amazonaws.com:8002/graphql"
const client = new ApolloClient({
    uri: URI,
    cache,
});

export default client;



