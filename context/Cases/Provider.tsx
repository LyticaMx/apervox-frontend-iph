import { useState, useMemo, ReactNode, ReactElement, useCallback } from 'react'
import { CasesContext, initialState } from './context'
import { useApolloClient } from '@apollo/client'
import { GET_CASES } from './queries.graphql'
import { get } from 'lodash'
import { ContextType, GetDataPayload, State } from './types'
import { useIonLoading } from '@ionic/react'
import { useLoader } from '../Loader'

interface Props {
  children: ReactNode
}

const CasesProvider = ({ children }: Props): ReactElement => {
  const client = useApolloClient();
  const { actions } = useLoader()
  const [state, setState] = useState<State>(initialState)

  const getData = useCallback(async (params?: GetDataPayload): Promise<void> => {
    try {
      const first = get(params, 'first', state.pagination.first);
      const cursor = get(params, 'cursor', state.pagination.endCursor);
  
      actions.show()
      const res = await client.query({ query: GET_CASES, variables: { first, cursor } });
      console.log("🚀 ~ file: Provider.tsx:25 ~ getData ~ res:", res)
      const { edges, pageInfo } = res.data.cases;
  
      setState(prev => ({
        data: [...prev.data, ...edges.map(item => item.node)],
        pagination: {
          first,
          ...pageInfo
        }
      }))

    } catch (error) {
      return Promise.reject(error)
    }
    finally {
      console.log('finally?')
      actions.hide()
    }
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
