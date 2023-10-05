import { Pagination } from "@/types/pagination"

export interface Notification {
  mongoId: string
  title: string
  latitude: number
  longitude: number
  description: String
}

export interface State {
  pagination: Pagination
  data: Notification[]
  notification?: Notification
  
}

export interface GetDataPayload {
  first?: number
  cursor?: string
}

export interface Actions {
  getData: (params?: GetDataPayload) => Promise<void>
  getNotification: (id: string) => Promise<void>
}

export interface ContextType extends State {
  actions?: Actions
}
