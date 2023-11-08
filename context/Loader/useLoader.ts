import { useContext } from 'react'
import { ContextType } from './types'
import { LoaderContext } from './LoaderContext'

export const useLoader = (): ContextType => useContext(LoaderContext)
