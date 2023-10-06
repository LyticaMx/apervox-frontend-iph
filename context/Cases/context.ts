import { Context, createContext } from 'react';
import { State } from './types';

export const initialState: State = {
  witnessList: [],
  arrestedsList: [],
  caseId: '651f95704cf18e2f0983dd44',
};

export const CasesContext: Context<State> = createContext(initialState);
