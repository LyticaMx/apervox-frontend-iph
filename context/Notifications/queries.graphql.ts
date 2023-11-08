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
    NotificationssWithFilter(payload: $id, type: id) {
      edges {
        node {
          mongoId
          title
          description
          latitude
          longitude
          responses {
            id
            status
          }
        }
      }
    }
  }
`

export const CREATE_NOTIFICATION_RESPONSE = gql`
  mutation createResponse(
    $notificationId: String!
    $firstresponserId: String!
    $status: StatusNR!
  ) {
    addNotificationResponse(
      newNotificationResponse: {
        notificationId: $notificationId
        firstresponserId: $firstresponserId
        status: $status
      }
    ) {
      stopTime
      updatedAt
      status
      mongoId
      createdAt
    }
  }
`

export const UPDATE_NOTIFICATION_RESPONSE = gql`
  mutation updateResponse(
    $id: String!
    $status: StatusNR!
  ) {
    updateNotificationResponse(
      payload: {
        id: $id
        data: { status: $status }
      }
    ) {
      status
      notification {
        case {
          id
          status
          folio
        }
      }
    }
  }
`