import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import NavigationBar from './components/NavigationBar/NavigationBar'
import AppRoutes from './AppRoutes'
import './styles/App.scss'

const App = () => {
  return (
    <div className='App'>
      <Router>
        <NavigationBar></NavigationBar>
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, ...rest } = route
            return <Route key={index} {...rest} element={element} />
          })}
        </Routes>
      </Router>
    </div>
  )
}

export default App
