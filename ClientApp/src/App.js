import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import FrontPage from './components/FrontPage/FrontPage'
import Dashboard from './components/Dashboard/Dashboard'
import NavigationBar from './components/NavigationBar/NavigationBar'
import Login from './containers/Login/Login'
import './styles/App.scss'

const App = () => {
  return (
    <div className='App'>
      <Router>
        <NavigationBar></NavigationBar>
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<FrontPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
