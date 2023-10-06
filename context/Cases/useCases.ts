import { useContext } from 'react';
import { CasesContext } from './context';
import { ContextType } from './types';

export const useCases = (): ContextType => useContext(CasesContext);
