import { Context, createContext } from 'react';
import { State } from './types';

export const initialState: State = {
  crimes: [],
  witnessList: [],
  arrestedsList: [],
  casualties: [],
  caseId: '651f95704cf18e2f0983dd44',
};

export const CaseContext: Context<State> = createContext(initialState);
