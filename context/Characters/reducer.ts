import { Action } from 'types/contextReducer'
import { State } from './types'
import { Types } from './constants'

export const reducer = (state: State, action: Action<Types>): State => {
  switch (action.type) {
    case Types.SET_DATA:
      return { ...state, data: action.payload }
    case Types.SET_PAGINATION:
      return { ...state, pagination: action.payload }
    case Types.SET_CHARACTER:
      return { ...state, character: action.payload }
    
    default:
      return state
  }
}
