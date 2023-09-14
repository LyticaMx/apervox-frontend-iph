import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
    query Characters($page: Int){
        characters(page: $page){
            info {
                pages
                count
            }
            results{
                name                
                status              
                species             
                type                
                gender                       
                image                           
            }
        }
    }
`

export const GET_CHARACTER = gql`
query Character($id: ID!) {
    character(id: $id) {
        id
        name
    }
}
`