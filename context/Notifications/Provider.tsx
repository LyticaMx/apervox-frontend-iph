import { ReactElement, ReactNode, Reducer, useMemo, useReducer } from 'react'
import { NotificationsContext, initialState } from './context'
import { useActions } from './actions'
import { ContextType, State } from './types'
import { reducer } from './reducer'
import { Types } from './constants'
import { Action } from 'types/contextReducer'

interface Props {
  children: ReactNode
}

const NotificationsProvider = (props: Props): ReactElement => {
  const { children } = props
  const [state, dispatch] = useReducer<Reducer<State, Action<Types>>>(reducer, initialState)
  const actions = useActions(state, dispatch)

  const contextValue = useMemo<ContextType>(
    () => Object.assign({}, state, { actions }),
    [state, actions]
  )

  return (
    <NotificationsContext.Provider value={contextValue}>
      {children}
    </NotificationsContext.Provider>
  )
}

export { NotificationsProvider }
