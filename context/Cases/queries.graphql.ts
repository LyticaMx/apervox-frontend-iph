import { gql } from '@apollo/client';

export const GET_WITNESS = gql`
  query MyQuery {
    witnesses {
      edges {
        node {
          profile {
            fathersName
            firstName
            fullName
            id
            mothersName
          }
        }
      }
    }
  }
`;

export const GET_ARRESTED = gql`
  query MyQuery {
    arresteds {
      edges {
        node {
          profile {
            fathersName
            firstName
            fullName
            id
            mothersName
          }
        }
      }
    }
  }
`;

export const ADD_ARRESTED = gql`
  mutation Arrestados(
    $firstName: String!
    $fathersName: String!
    $mothersName: String!
    $firstResponserId: String!
    $caseId: String!
  ) {
    addArrested(
      newArrested: {
        firstResponserId: $firstResponserId
        caseId: $caseId
        firstName: $firstName
        fathersName: $fathersName
        mothersName: $mothersName
      }
    ) {
      profile {
        fathersName
        firstName
        fullName
        id
        mothersName
      }
    }
  }
`;

export const UPDATE_ARRESTED = gql`
  mutation Arrestados(
    $id: String!
    $firstName: String!
    $fathersName: String!
    $mothersName: String!
  ) {
    updateArrested(
      payload: {
        id: $id
        data: { fathersName: $fathersName, firstName: $firstName, mothersName: $mothersName }
      }
    ) {
      profile {
        fathersName
        firstName
        fullName
        id
        mothersName
      }
    }
  }
`;
