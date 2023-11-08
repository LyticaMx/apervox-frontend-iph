import { createAction } from 'types/contextReducer'
import { Notification, NotificationResponse } from './types'
import { Pagination } from '@/types/pagination'

export enum Types {
  SET_DATA = 'notifications/setData',
  SET_PAGINATION = 'notifications/setPagination',
  SET_NOTIFICATION = 'notifications/setNotification',
  SET_RESPONSE = 'notifications/setResponse',
}

export const actions = {
  setData: createAction<Types, Notification[]>(Types.SET_DATA),
  setPagination: createAction<Types, Pagination>(Types.SET_PAGINATION),
  setNotification: createAction<Types, Notification | undefined>(Types.SET_NOTIFICATION),
  setResponse: createAction<Types, NotificationResponse | undefined>(Types.SET_RESPONSE),
}
