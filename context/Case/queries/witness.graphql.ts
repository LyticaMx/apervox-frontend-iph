import { gql } from '@apollo/client';

export const GET_WITNESS = gql`
  query MyQuery($id: String!) {
    WitnessesWithFilter(payload: $id, type: caseId) {
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

export const ADD_WITNESS = gql`
  mutation witness(
    $firstName: String!
    $fathersName: String!
    $mothersName: String!
    $firstResponserId: String!
    $caseId: String!
  ) {
    addWitness(
      newWitness: {
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

export const UPDATE_WITNESS = gql`
  mutation witness(
    $mongoId: String!
    $firstName: String!
    $fathersName: String!
    $mothersName: String!
  ) {
    updateWitness(
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

export const DELETE_WITNESS = gql`
  mutation witness($mongoId: String!) {
    deleteWitness(witnessToDelete: { id: $mongoId }) {
      mongoId
    }
  }
`;