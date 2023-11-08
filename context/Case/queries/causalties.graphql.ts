import { gql } from '@apollo/client';

export const GET_CASUALTIES = gql`
  query MyQuery($id: String! ) {
    CasualtiesWithFilter(payload: $id, type: caseId) {
      edges {
        node {
          mongoId
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

export const ADD_CASUALTY = gql`
  mutation MyMutation(
    $firstName: String!
    $fathersName: String!
    $mothersName: String!
    $firstResponserId: String!
    $caseId: String!
  ) {
    addCasualty(
        newCasualty: {
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
      mongoId
    }
  }
`;

export const UPDATE_CASUALTY = gql`
  mutation MyMutation(
    $mongoId: String!
    $firstName: String!
    $fathersName: String!
    $mothersName: String!
  ) {
    updateCasualty(
      payload: {
        id: $mongoId
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
      mongoId
    }
  }
`;

export const DELETE_CASUALTY = gql`
  mutation MyMutation($mongoId: String!) {
    deleteCasualty(casualtyToDelete: { id: $mongoId }) {
      mongoId
    }
  }
`;
