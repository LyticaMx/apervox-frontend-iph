export interface Episode {}


export interface Pagination {
  page: number
  pages: number
  count: number
}

export interface Character {
  id: number
  name:	string
  status:	string
  species:	string
  type:	string
  gender:	string
  origin:	object
  location:	object
  image:	string
  episode:	Partial<Episode>[]
  created:	string
}

export interface State {
  pagination: Pagination
  data: Character[]
  character?: Character
  
}

export interface Actions {
  getData: (page?: number) => Promise<void>
  getCharacter: (id: number) => Promise<void>
}

export interface ContextType extends State {
  actions?: Actions
}
