import FrontPage from './components/FrontPage/FrontPage'
import Members from './containers/Members/Members'
import Teams from './containers/Teams/Teams'
import Login from './containers/Login/Login'
import Settings from './containers/Settings/Settings'

const AppRoutes = [
  {
    path: '/dashboard/members',
    element: <Members />
  },
  {
    path: '/dashboard/teams',
    element: <Teams />
  },
  {
    path: '/dashboard/settings',
    element: <Settings></Settings>
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
