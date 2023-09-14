import { useContext } from 'react'
import { CharactersContext } from './context'
import { ContextType } from './types'

export const useCharacters = (): ContextType => useContext(CharactersContext)
