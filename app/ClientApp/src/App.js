import { Routes, Route } from 'react-router-dom'
import { useLocation } from 'react-router'
import { ErrorBoundary } from 'react-error-boundary'
import NavigationBar from './components/NavigationBar/NavigationBar'
import JsErrorComponent from './components/ErrorComponent/ErrorComponent'
import AppRoutes from './AppRoutes'
import './styles/App.scss'

const App = () => {
  const location = useLocation()
  return (
    <div className='App'>
      <ErrorBoundary FallbackComponent={JsErrorComponent}>
        <NavigationBar></NavigationBar>
        <ErrorBoundary
          FallbackComponent={JsErrorComponent}
          resetKeys={[location]}
        >
          <Routes>
            {AppRoutes.map((route, index) => {
              const { element, ...rest } = route
              return <Route key={index} {...rest} element={element} />
            })}
          </Routes>
        </ErrorBoundary>
      </ErrorBoundary>
    </div>
  )
}

export default App
