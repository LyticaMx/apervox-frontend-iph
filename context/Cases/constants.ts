import { createAction } from 'types/contextReducer';
import { witness, arresteds } from './types';

export enum Types {
  ADD_WITNESS = 'cases/addWitness',
  EDIT_WITNESS = 'cases/editWitness',
  ADD_ARRESTED = 'cases/addArrested',
  EDIT_ARRESTED = 'cases/editArrested',
}

export const actions = {
  addWitness: createAction<Types, witness>(Types.ADD_WITNESS),
  editWitness: createAction<Types, witness>(Types.EDIT_WITNESS),
  addArrested: createAction<Types, arresteds | undefined>(Types.ADD_ARRESTED),
  editArrested: createAction<Types, arresteds | undefined>(Types.EDIT_ARRESTED),
};
