import { gql } from '@apollo/client';

export const GET_CASE = gql`
query MyQuery($id: String!) {
  CasesWithFilter(payload: $id, type: id) {
    edges {
      node {
        mongoId
        folio
        status
        
        notification {
          title
        }
        summary {
          id
          crimeId
          injuries
          riskLevel
          casualties
        }
        support {
          id
          stopTime
          supportType
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

export const GET_CRIMES = gql`
query MyQuery {
  crimes {
    edges {
      node {
        name
        mongoId
      }
    }
  }
}
`

export const ADD_SUPPORTS = gql`
mutation MyMutation( $id: String! $supports: [SupportTypeCase!]! ){
  updateCase(payload: {data: {support: $supports}, id: $id}) {
    support {
      id
      stopTime
      supportType
    }
  }
}

`

export const CREATE_SUMMARY = gql`
  mutation createSummary(
    $caseId: String!
    $crimeId: String!
    $riskLevel: RiskLevel!
    $casualties: Int!
    $injuries: Int!
  ) {
    addSummary(
      newSummary: {caseId: $caseId, crimeId: $crimeId, riskLevel: $riskLevel, casualties: $casualties, injuries: $injuries}
    ) {
      mongoId
    }
  }
`

export const UPDATE_SUMMARY = gql`
  mutation updateSummary(
    $id: String!
    $crimeId: String!
    $riskLevel: RiskLevel!
    $casualties: Int!
    $injuries: Int!
  ) {
    updateSummary(
      payload: {
        id: $id
        data: { crimeId: $crimeId, riskLevel: $riskLevel, casualties: $casualties, injuries: $injuries }
      }
    ) {
      mongoId
    }
  }
`