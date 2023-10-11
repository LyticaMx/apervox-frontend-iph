import { Pagination } from "@/types/pagination"

export interface Notification {
  mongoId: string
  title: string
  latitude: number
  longitude: number
  description: String
  responses: Array<{ id }> | null
}

export interface NotificationResponse {
  mongoId: string
  createdAt: string
  status: string 
  stopTime: string 
  updatedAt: string
}

export interface State {
  pagination: Pagination
  data: Notification[]
  notification?: Notification
  notificationResponse?: NotificationResponse
  
}

export interface GetDataPayload {
  first?: number
  cursor?: string
}

export interface Actions {
  getData: (params?: GetDataPayload) => Promise<void>
  getNotification: (id: string) => Promise<void>
  changeStatus: () => Promise<void>
}

export interface ContextType extends State {
  actions?: Actions
}
