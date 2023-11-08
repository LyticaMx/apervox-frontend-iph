import { createContext, Context } from 'react'
import { Auth, AuthContextType } from 'types/auth'

export const initialState: Auth = {
  isLogguedIn: false,
  firstResponser_id: '653be89fe312e6625d45c81e',
  profile: {
    id: '', 
    firstName: '',
    fathersName: '',
    mothersName: '',
    fullName: '',
  }
}

export const AuthContext: Context<AuthContextType> = createContext({
  auth: initialState
})
