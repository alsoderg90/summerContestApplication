import FrontPage from './components/FrontPage/FrontPage'
import Dashboard from './components/Dashboard/Dashboard'
import Login from './containers/Login/Login'

const AppRoutes = [
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <FrontPage />
  }
]

export default AppRoutes
