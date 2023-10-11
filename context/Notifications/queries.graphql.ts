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
          }
        }
      }
    }
  }
`

export const CREATE_NOTIFICATION_RESPONSE = gql`
  mutation create(
    $notificationId: String!
    $firstresponserId: String!
    $status: String!
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
  mutation update(
    $id: String!
    $status: String!
  ) {
    updateNotificationResponse(
      payload: {
        id: $id
        data: { status: $status }
      }
    ) {
      profile {
        fathersName
        firstName
        fullName
        id
        mothersName
      }
      mongoId
    }
  }
`