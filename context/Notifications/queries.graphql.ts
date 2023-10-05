import { gql } from "@apollo/client";

export const GET_NOTIFICATIONS = gql`
query MyQuery ($first: Int!, $cursor: String ){
    notifications(first: $first, after: $cursor) {
      edges {
        node {
          mongoId
          title
          description
          createdAt
        }
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`

export const GET_NOTIFICATION = gql`
query MyQuery($id: String!) {
    NotificationssWithFilter(id: $id) {
      edges {
        node {
          mongoId
          title
          description
          latitude
          longitude
        }
      }
    }
  }
`