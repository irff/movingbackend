import { isAuthenticated, restrictToAdmin, setUserIdFromToken } from 'middleware/validators'
import * as record from './controller'

export const baseUrl = '/orders'

export default [
  {
    method: 'GET',
    route: '/me',
    handlers: [
      isAuthenticated,
      record.getUserOrder,
    ]
  },
  {
    method: 'GET',
    route: '/:id',
    handlers: [
      isAuthenticated,
      record.get,
    ]
  },
  {
    method: 'POST',
    route: '/',
    handlers: [
      isAuthenticated,
      record.post,
    ]
  },
  {
    method: 'PUT',
    route: '/:id',
    handlers: [
      isAuthenticated,
      record.put,
    ]
  },
]
