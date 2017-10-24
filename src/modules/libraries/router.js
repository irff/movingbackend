import { isAuthenticated, restrictToAdmin, setUserIdFromToken } from 'middleware/validators'
import * as library from './controller'

export const baseUrl = '/libraries'

export default [
  {
    method: 'GET',
    route: '/',
    handlers: [
      library.getAll
    ]
  },
  {
    method: 'GET',
    route: '/me',
    handlers: [
      isAuthenticated,
      setUserIdFromToken,
      library.getUserLibrary,
    ]
  },
  {
    method: 'GET',
    route: '/:id',
    handlers: [
      library.get
    ]
  },
]
