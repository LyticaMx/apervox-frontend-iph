import { createAction } from '../../types/contextReducer'
import { PageInfo, Operator } from './types'

export enum Types {
  SET_DATA = 'characters/setData',
  SET_PAGINATION = 'characters/setPagination',
  SET_CHARACTER = 'characters/setCharacter',
}

export const actions = {
  setData: createAction<Types, Operator[]>(Types.SET_DATA),
  setPagination: createAction<Types, PageInfo>(Types.SET_PAGINATION)
}