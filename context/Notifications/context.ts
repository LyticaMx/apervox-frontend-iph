import { Context, createContext } from 'react'
import { State } from './types'

export const initialState: State = {
  pagination: {
    first: 20,
    endCursor: null,
    startCursor: null,
    hasNextPage: false,
    hasPreviousPage: false
  },
  data: [],
  notification: undefined,
  notificationResponse: undefined,
}

export const NotificationsContext: Context<State> = createContext(initialState)
