import { useContext } from 'react';
import { CaseContext } from './context';
import { ContextType } from './types';

export const useCase = (): ContextType => useContext(CaseContext);
