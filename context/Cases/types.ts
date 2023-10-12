import { Pagination } from "@/types/pagination"

export interface Case {
  mongoId: string
  folio: string,
  status: string
}

export interface State {
  pagination: Pagination
  data: Case[]
}

export interface GetDataPayload {
  first?: number
  cursor?: string
}

export interface Actions {
  getData: (params?: GetDataPayload) => Promise<void>
}

export interface ContextType extends State {
  actions?: Actions
}
