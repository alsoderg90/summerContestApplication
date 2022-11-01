import Login from '../Login/Login'
import { useDispatch, useSelector } from 'react-redux'
import { selectError, selectUser } from 'redux/modules/login/selectors'
import { logOut } from 'redux/modules/login/actions'
import { Container, Button } from 'react-bootstrap'
import ErrorComponent from 'components/ErrorComponent/ErrorComponent'

const Settings = () => {
  const user = useSelector((state) => selectUser(state))
  const error = useSelector((state) => selectError(state))
  const dispatch = useDispatch()

  const handeLogOut = () => {
    window.localStorage.removeItem('user')
    window.localStorage.removeItem('token')
    dispatch(logOut())
  }

  if (error) {
    return <ErrorComponent {...error}></ErrorComponent>
  }

  if (user) {
    return (
      <>
        <Container>
          <h1>Hello {user.email}</h1>
          <Button onClick={handeLogOut}>LogOut</Button>
        </Container>
      </>
    )
  } else return <Login></Login>
}

export default Settings
