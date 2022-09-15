import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
  
import FrontPage from './components/FrontPage/FrontPage'
import NavigationBar from './components/NavigationBar/NavigationBar'
import Login from './containers/Login/Login'
import './styles/App.scss'

const App = () => {

  return (
    <div className="App">
      <Router>
        <NavigationBar></NavigationBar>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<FrontPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
