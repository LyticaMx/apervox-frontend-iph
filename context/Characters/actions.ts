import { Dispatch } from 'react'
import { useApolloClient } from '@apollo/client'
import { Action } from 'types/contextReducer'

import { Actions, State } from './types'
import { Types, actions } from './constants'
import { GET_CHARACTER, GET_CHARACTERS } from './queries.graphql'

export const useActions = (state: State, dispatch: Dispatch<Action<Types>>): Actions => {
  const client = useApolloClient()

  const getData = async (page?: number): Promise<void> => {
    const res = await client.query({query: GET_CHARACTERS, variables: {
      page: page ?? state.pagination.page
    }})

    const { results, info } = res.data.characters

    dispatch(actions.setData(results))
    dispatch(actions.setPagination({
      count: info.count,
      pages: info.pages,
      page: page ?? state.pagination.page
    }))
  }

  const getCharacter = async (id: number): Promise<void> => {
    const res = await client.query({query: GET_CHARACTER, variables: {
      id
    }})

    dispatch(actions.setCharacter(res.data.character))
  }
  
  
  return {
    getData,
    getCharacter
  }
}
