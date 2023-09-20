import { Context, createContext } from 'react'
import { State } from './types'

export const initialStateOperators: State = {
  pagination: {
    hasNextPage:false,
    hasPreviousPage: false,
  },
  data: []
}

export const OperatorsContext: Context<State> = createContext(initialStateOperators)
