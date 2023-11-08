import { createContext, Context } from 'react'
import { ContextType, State } from './types'

const initialState: State = {
  show: false
}

export const LoaderContext: Context<ContextType> =
  createContext(initialState)
