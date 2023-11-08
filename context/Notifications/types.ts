import { Pagination } from "@/types/pagination"

export interface Notification {
  mongoId: string
  title: string
  latitude: number
  longitude: number
  description: String
  responses: Array<Partial<NotificationResponse>> | null
}

export interface NotificationResponse {
  id: string
  firstResponser_id: string
  status: string 
  stopTime: string 
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
  changeStatus: (status?: string) => Promise<void>
}

export interface ContextType extends State {
  actions?: Actions
}
