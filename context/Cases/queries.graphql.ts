import { gql } from "@apollo/client";

export const GET_CASES = gql`
query MyQuery ($first: Int!, $cursor: String ){
    cases(first: $first, after: $cursor) {
      edges {
        node {
          folio
          mongoId
          status
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`
