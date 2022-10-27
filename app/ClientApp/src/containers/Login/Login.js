import React, { useState } from 'react'
import { Container, FormGroup, Button } from 'react-bootstrap'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-mui'
import * as yup from 'yup'
import styles from './styles.module.css'
import axios from 'axios'

const createSchema = () => {
  return yup.object({
    email: yup.string().email().required().email(),
    password: yup.string().required().min(6)
  })
}

const Login = () => {
  const schema = createSchema()
  const [form, setForm] = useState()

  const handleSubmit = (formData) => {
    //axios.get('/members').then((res) => console.log(res))
    alert(JSON.stringify(formData, null, 2))
  }

  return (
    <React.Fragment>
      <Container>
        <div className={`login-wrapper ${styles.loginPageStyle}`}>
          <h2>Login Page</h2>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={handleSubmit}
            validationSchema={schema}
          >
            <Form>
              <div className='form-group'>
                <Field name='email' component={TextField} label='Email' />
              </div>
              <div className='form-group'>
                <Field
                  component={TextField}
                  type='password'
                  name='password'
                  label='Password'
                />
              </div>
              <div>
                <Button variant='success' type='submit'>
                  Login
                </Button>
              </div>
            </Form>
          </Formik>
        </div>
      </Container>
    </React.Fragment>
  )
}

export default Login
