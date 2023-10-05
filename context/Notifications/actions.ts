import { Dispatch } from 'react'
import { useApolloClient } from '@apollo/client'
import { Action } from '@/types/contextReducer'

import { Actions, GetDataPayload, State } from './types'
import { Types, actions } from './constants'
import { GET_NOTIFICATION, GET_NOTIFICATIONS } from './queries.graphql'
import { get } from 'lodash'

export const useActions = (state: State, dispatch: Dispatch<Action<Types>>): Actions => {
  const client = useApolloClient()

  const getData = async (params: GetDataPayload): Promise<void> => {
    const first = get(params, 'first', state.pagination.first)
    const cursor = get(params, 'cursor', state.pagination.endCursor)

    const res = await client.query({query: GET_NOTIFICATIONS, variables: { first, cursor }})

    
    const { edges, pageInfo } = res.data.notifications
    
    console.log("🚀 ~ res:", { first, cursor },  edges, pageInfo)

    dispatch(actions.setData([
      ...state.data, 
      ...edges.map(item => item.node)
    ]))
    dispatch(actions.setPagination({
      first,
      ...pageInfo
    }))
  }

  const getNotification = async (id: string): Promise<void> => {
    const res = await client.query({query: GET_NOTIFICATION, variables: {
      id
    }})

    const notification = get(res.data, 'NotificationssWithFilter.edges[0].node')
    dispatch(actions.setNotification(notification))
  }
  
  
  return {
    getData,
    getNotification
  }
}
