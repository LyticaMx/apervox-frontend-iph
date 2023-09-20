import { useContext } from 'react'
import { OperatorsContext } from './context'
import { ContextType } from './types'

export const useOperators = (): ContextType => useContext(OperatorsContext)
