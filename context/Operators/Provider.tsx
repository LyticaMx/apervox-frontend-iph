import { ReactElement, ReactNode, Reducer, useMemo, useReducer } from 'react'
import { OperatorsContext, initialStateOperators } from './context'
import { useActions } from './actions'
import { ContextType, State } from './types'
import { reducer } from './reducer'
import { Types } from './constants'
import { Action } from 'types/contextReducer'

interface Props {
  children: ReactNode
}

const OperatorProvider = (props: Props): ReactElement => {
  const { children } = props
  const [state, dispatch] = useReducer<Reducer<State, Action<Types>>>(reducer, initialStateOperators)
  const actions = useActions(state, dispatch)

  const contextValue = useMemo<ContextType>(
    () => Object.assign({}, state, { actions }),
    [state, actions]
  )

  return (
    <OperatorsContext.Provider value={contextValue}>
      {children}
    </OperatorsContext.Provider>
  )
}

export { OperatorProvider }
