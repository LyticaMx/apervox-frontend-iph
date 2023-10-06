import { createAction } from 'types/contextReducer';
import { witness, arresteds, APIAssitanListResponse } from './types';

export enum Types {
  ADD_WITNESS = 'cases/addWitness',
  EDIT_WITNESS = 'cases/editWitness',
  GET_WITNESS = 'cases/getWitness',
  DELETE_WITNESS = 'cases/deleteWitness',
  ADD_ARRESTED = 'cases/addArrested',
  EDIT_ARRESTED = 'cases/editArrested',
  GET_ARRESTED = 'cases/getArrested',
  DELETE_ARRESTED = 'cases/deleteArrested',
}
export const actions = {
  addWitness: createAction<Types, witness>(Types.ADD_WITNESS),
  editWitness: createAction<Types, witness>(Types.EDIT_WITNESS),
  deleteWitness: createAction<Types, witness>(Types.DELETE_WITNESS),
  addArrested: createAction<Types, arresteds | undefined>(Types.ADD_ARRESTED),
  getWitness: createAction<Types, APIAssitanListResponse[]>(Types.GET_WITNESS),
  getArrested: createAction<Types, APIAssitanListResponse[]>(Types.GET_ARRESTED),
  editArrested: createAction<Types, arresteds | undefined>(Types.EDIT_ARRESTED),
  deleteArrested: createAction<Types, arresteds>(Types.DELETE_ARRESTED),
};
