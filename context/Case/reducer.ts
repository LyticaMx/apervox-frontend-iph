import { Action } from 'types/contextReducer';
import { State } from './types';
import { Types } from './constants';

export const reducer = (state: State, action: Action<Types>): State => {
  switch (action.type) {
    case Types.ADD_CASE:
      return { ...state, case: action.payload, caseId: action.payload.mongoId };
    case Types.ADD_ARRESTED:
      return { ...state, arrestedsList: action.payload };
    case Types.ADD_WITNESS:
      return { ...state, witnessList: action.payload };
    case Types.EDIT_ARRESTED:
      return { ...state, arrestedsList: action.payload };
    case Types.EDIT_WITNESS:
      return { ...state, witnessList: action.payload };
    case Types.GET_WITNESS:
      return { ...state, witnessList: action.payload };
    case Types.GET_ARRESTED:
      return { ...state, arrestedsList: action.payload };
    case Types.SET_CRIMES:
      return { ...state, crimes: action.payload };
    case Types.SET_CASUALTIES:
      return { ...state, casualties: action.payload };
    default:
      return state;
  }
};
