import { createAction } from 'types/contextReducer';
import { witness, arresteds, APIAssitanListResponse, Case, Crime, Casualty } from './types';

export enum Types {
  ADD_CASE = 'case/addCase',
  ADD_WITNESS = 'case/addWitness',
  EDIT_WITNESS = 'case/editWitness',
  GET_WITNESS = 'case/getWitness',
  DELETE_WITNESS = 'case/deleteWitness',
  ADD_ARRESTED = 'case/addArrested',
  EDIT_ARRESTED = 'case/editArrested',
  GET_ARRESTED = 'case/getArrested',
  DELETE_ARRESTED = 'case/deleteArrested',
  SET_CRIMES = 'case/setCrimes',
  SET_CASUALTIES = 'case/setCasualties',
}
export const actions = {
  setCase: createAction<Types, Case>(Types.ADD_CASE),
  addWitness: createAction<Types, witness>(Types.ADD_WITNESS),
  editWitness: createAction<Types, witness>(Types.EDIT_WITNESS),
  deleteWitness: createAction<Types, witness>(Types.DELETE_WITNESS),
  addArrested: createAction<Types, arresteds | undefined>(Types.ADD_ARRESTED),
  getWitness: createAction<Types, APIAssitanListResponse[]>(Types.GET_WITNESS),
  getArrested: createAction<Types, APIAssitanListResponse[]>(Types.GET_ARRESTED),
  editArrested: createAction<Types, arresteds | undefined>(Types.EDIT_ARRESTED),
  deleteArrested: createAction<Types, arresteds>(Types.DELETE_ARRESTED),
  setCrimes: createAction<Types, Crime[]>(Types.SET_CRIMES),
  setCasualties: createAction<Types, Casualty[]>(Types.SET_CASUALTIES),
};
