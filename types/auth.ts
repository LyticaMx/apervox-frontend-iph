
export interface Profile {
  id: string
  firstName: string
  fathersName: string
  mothersName: string
  fullName: string
}

export interface Auth {
  firstResponser_id: string
  isLogguedIn: boolean
  profile: Profile
}


export interface AuthContextType {
  auth: Auth
  actions?: {
    signIn: (firstResponser_id?: string) => Promise<void>
  }
}
