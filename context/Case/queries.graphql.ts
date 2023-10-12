import { gql } from '@apollo/client';

export const GET_CASE = gql`
query MyQuery($id: String!) {
  CasesWithFilter(id: $id) {
    edges {
      node {
        mongoId
        folio
        status
        
        notification {
          title
        }
        notes {
          text
          id
        }
      }
    }
  }
}
`

// summary {
//   injuries
//   riskLevel
//   casualties
// }

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

export const GET_ARRESTED = gql`
  query MyQuery($id: String! ) {
    ArrestedsWithFilter(payload: $id, type: id) {
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
      mongoId
    }
  }
`;

export const UPDATE_ARRESTED = gql`
  mutation Arrestados(
    $mongoId: String!
    $firstName: String!
    $fathersName: String!
    $mothersName: String!
  ) {
    updateArrested(
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

export const DELETE_ARRESTED = gql`
  mutation arrested($mongoId: String!) {
    deleteArrested(arrestedToDelete: { id: $mongoId }) {
      mongoId
    }
  }
`;
