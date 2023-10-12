import { createContext, Context } from 'react'
import { ContextType, State } from './types'

export const initialState: State = {
  pagination: {
    first: 20,
    endCursor: null,
    startCursor: null,
    hasNextPage: false,
    hasPreviousPage: false
  },
  data: []
}

export const CasesContext: Context<ContextType> = createContext(initialState)
