import { gql } from "@apollo/client";

export const GET_FIRSTRESPONSER = gql`
query MyQuery($id: String!) {
  FirstResponsersWithFilter(payload: $id, type: id) {
    edges {
      node {
        profile {
          id
          firstName
          fathersName
          mothersName
          fullName
        }
        mongoId
      }
    }
    }
  }
`