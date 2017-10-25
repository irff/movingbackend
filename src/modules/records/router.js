import { isAuthenticated, restrictToAdmin, setUserIdFromToken } from 'middleware/validators'
import * as record from './controller'

export const baseUrl = '/records'

export default [
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
  {
    method: 'DELETE',
    route: '/:id',
    handlers: [
      isAuthenticated,
      record.del,
    ]
  },
]
