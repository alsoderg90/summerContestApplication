import { useEffect, useState } from 'react'
import Login from '../Login/Login'

const Settings = () => {
  const [user, setUser] = useState(undefined)
  useEffect(() => {
    setUser(window.localStorage.getItem('user'))
  }, [user])

  const handeLogOut = () => {
    window.localStorage.removeItem('user')
    window.localStorage.removeItem('token')
    setUser(undefined)
  }

  if (user) {
    return (
      <>
        <h1>hello {user.email}</h1>
        <button onClick={handeLogOut}>LogOut</button>
      </>
    )
  } else return <Login></Login>
}

export default Settings
