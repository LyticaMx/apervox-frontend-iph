import { gql } from "@apollo/client";

export const GET_EPISODES = gql`
    query {
        episodes {
            info {
                pages
            }
            results{
                id
                name
            }
        }
    }
`

export const GET_EPISODE = gql`
query Episode($id: ID!) {
    episode(id: $id) {
        id
        name
    }
}
`

export const UPDATE_EPISODE = gql`
mutation Episode($id: ID!) {
    addepisode(id: $id) {
        id
        name
    }
}
`