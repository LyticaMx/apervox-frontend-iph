import { Dispatch } from 'react'
import { useApolloClient } from '@apollo/client'

import { Actions, State } from './types'
import { Types, actions } from './constants'
import { GET_OPERATORS } from './queries.graphql'

export const useActions = (state: State, dispatch): Actions => {
  const client = useApolloClient()

  const getData = async (page?: number): Promise<void> => {
    const res = await client.query({query: GET_OPERATORS})

    const { edges, pageInfo } = res.data.operator

    const edgesMap = edges.map(edge => edge.node.profile)

    dispatch(actions.setData(edgesMap))
    // dispatch(actions.setPagination({
    //   count: info.count,
    //   pages: info.pages,
    //   page: page ?? state.pagination.page
    // }))

  }


  
  
  return {
    getData,
  }
}
