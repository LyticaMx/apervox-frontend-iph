import { createAction } from 'types/contextReducer'
import { Character, Pagination } from './types'

export enum Types {
  SET_DATA = 'characters/setData',
  SET_PAGINATION = 'characters/setPagination',
  SET_CHARACTER = 'characters/setCharacter',
}

export const actions = {
  setData: createAction<Types, Character[]>(Types.SET_DATA),
  setPagination: createAction<Types, Pagination>(Types.SET_PAGINATION),
  setCharacter: createAction<Types, Character | undefined>(Types.SET_CHARACTER),
}
