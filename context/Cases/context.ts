import { Context, createContext } from 'react';
import { State } from './types';

export const initialState: State = {
  witnessList: [],
  arrestedsList: [],
};

export const CasesContext: Context<State> = createContext(initialState);
