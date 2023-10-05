import { useContext } from 'react'
import { NotificationsContext } from './context'
import { ContextType } from './types'

export const useNotifications = (): ContextType => useContext(NotificationsContext)
