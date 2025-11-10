import { createContext, useContext, useMemo, useReducer } from 'react'

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW':
      return action.payload
    case 'HIDE':
      return ''
    default:
      return state
  }
}

export const NotificationProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, '')

  const value = useMemo(() => ({ notification, dispatch }), [notification])

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error(
      'useNotificationValue must be used within a NotificationProvider',
    )
  }
  return context.notification
}

export const useNotificationDispatch = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error(
      'useNotificationDispatch must be used within a NotificationProvider',
    )
  }
  return context.dispatch
}
