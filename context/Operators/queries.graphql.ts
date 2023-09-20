import { gql } from "@apollo/client";

export const GET_OPERATORS = gql`
query operators {
  operator {
    edges {
      node {
        profile {
          createdAt
          fathersName
          firstName
          fullName
          id
          mothersName
        }
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
  }
}
`
