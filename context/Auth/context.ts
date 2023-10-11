import { createContext, Context } from 'react'
import { Auth, AuthContextType } from 'types/auth'

export const initialState: Auth = {
  isLogguedIn: false,
  firstResponser_id: '6525c379b85553e90a9896b2',
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
