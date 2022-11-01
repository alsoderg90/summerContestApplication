import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Container, Button, Row, Col } from 'react-bootstrap'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-mui'
import * as yup from 'yup'
import styles from './styles.module.css'
import { login } from 'redux/modules/login/actions'

const createSchema = () => {
  return yup.object({
    email: yup.string().email().required().email(),
    password: yup.string().required().min(6)
  })
}

const Login = () => {
  const schema = createSchema()
  const dispatch = useDispatch()

  const handleSubmit = (formData) => {
    dispatch(login(formData))
    //alert(JSON.stringify(formData, null, 2))
  }

  return (
    <React.Fragment>
      <Container>
        <div className={`login-wrapper ${styles.loginPageStyle}`}>
          <Row>
            <h2 style={{ textAlign: 'left' }}>Login</h2>
          </Row>
          <p></p>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={handleSubmit}
            validationSchema={schema}
          >
            <Form>
              <Row>
                <Col>
                  <Field name='email' component={TextField} label='Email' />
                </Col>
                <Col>
                  <Field
                    component={TextField}
                    type='password'
                    name='password'
                    label='Password'
                  />
                </Col>
              </Row>
              <p></p>
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
