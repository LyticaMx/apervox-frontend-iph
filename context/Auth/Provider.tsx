import { useState, useMemo, ReactNode, ReactElement } from 'react'
import { Auth } from 'types/auth'
import { AuthContext, initialState } from './context'
import { useApolloClient } from '@apollo/client'
import { GET_FIRSTRESPONSER } from './queries.graphql'
import { get } from 'lodash'

interface Props {
  children: ReactNode
}

const AuthProvider = ({ children }: Props): ReactElement => {
  const client = useApolloClient();
  const [auth, setAuth] = useState<Auth>(initialState)

  const signIn = async (id?: string): Promise<void> => {
    try {
      
      const res = await client.query({
        query: GET_FIRSTRESPONSER,
        variables: {
          id: id ?? auth.firstResponser_id,
        },
      });

      const data = get(res.data, 'FirstResponsersWithFilter.edges[0].node');
      
      setAuth((prev) => ({
        ...prev,
        isLogguedIn: true,
        profile: data.profile
      }))

    } catch (error: any) {
      console.log("🚀 ~ file: Provider.tsx:24 ~ signIn ~ error:", error)
      
    }
  }

  const contextValue = useMemo(
    () => ({
      auth,
      actions: {
        signIn,
      }
    }),
    [auth]
  )

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export { AuthProvider }
