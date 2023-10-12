import { useState, useMemo, ReactNode, ReactElement, useCallback } from 'react'
import { CasesContext, initialState } from './context'
import { useApolloClient } from '@apollo/client'
import { GET_CASES } from './queries.graphql'
import { get } from 'lodash'
import { ContextType, GetDataPayload, State } from './types'

interface Props {
  children: ReactNode
}

const CasesProvider = ({ children }: Props): ReactElement => {
  const client = useApolloClient();
  const [state, setState] = useState<State>(initialState)

  const getData = useCallback(async (params?: GetDataPayload): Promise<void> => {
    const first = get(params, 'first', state.pagination.first);
    const cursor = get(params, 'cursor', state.pagination.endCursor);

    const res = await client.query({ query: GET_CASES, variables: { first, cursor } });
    const { edges, pageInfo } = res.data.cases;

    setState(prev => ({
      data: [...prev.data, ...edges.map(item => item.node)],
      pagination: {
        first,
        ...pageInfo
      }
    }))
  }, [])

  const contextValue = useMemo<ContextType>(
    () => Object.assign({}, state, { actions: { getData } }),
    [state, getData]
  )

  return (
    <CasesContext.Provider value={contextValue}>{children}</CasesContext.Provider>
  )
}

export { CasesProvider }
