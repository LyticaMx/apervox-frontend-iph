import { createContext, Context } from 'react'
import { Auth, AuthContextType } from 'types/auth'

export const initialState: Auth = {
  isLogguedIn: false,
  firstResponser_id: '65287e3e59469b7d750cf5dc',
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
