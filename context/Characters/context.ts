import { Context, createContext } from 'react'
import { State } from './types'

export const initialState: State = {
  pagination: {
    page: 1,
    pages: 0,
    count: 0
  },
  data: [],
  character: undefined,
}

export const CharactersContext: Context<State> = createContext(initialState)
