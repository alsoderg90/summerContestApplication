import { useState } from 'react'
import { Container, Col, FormGroup, Row } from 'react-bootstrap'
import * as yup from 'yup'
import Form from 'react-formal'

import styles from './styles.module.css'
import axios from 'axios'

const createSchema = () => {
  return yup.object({
    email: yup.string().email().required(),
    password: yup.string().required().min(6)
  })
}

const Login = () => {
  const schema = createSchema()
  const [form, setForm] = useState()

  const handleSubmit = (formData) => {
    axios.get('/api/members').then((res) => console.log(res))
    alert(JSON.stringify(formData, null, 2))
  }

  const handeClick = () => {
    console.log('moi')
    axios.get('/members').then((res) => console.log(res))
  }
  return (
    <>
      <button onClick={handeClick}> ASDSA </button>

      <Container className={styles.AuthFormContainer}>
        <Form
          className={styles.AuthForm}
          value={form}
          schema={schema}
          onChange={setForm}
          onSubmit={handleSubmit}
        >
          <div className={styles.AuthFormContent}>
            <h3 className={styles.AuthFormTitle}>Sign In</h3>
            <FormGroup className='mt-3'>
              <label>Email address</label>
              <Form.Field
                name='email'
                className='form-control mt-1'
                placeholder='Enter email'
              />
            </FormGroup>
            <FormGroup className='mt-3'>
              <label className={styles.AuthFormLabel}>Password</label>
              <Form.Field
                name='password'
                type='password'
                className='form-control mt-1'
                placeholder='Enter password'
              />
            </FormGroup>
            <div className='d-grid gap-2 mt-3'>
              <Form.Submit type='submit' className='btn btn-primary'>
                Submit
              </Form.Submit>
            </div>
            {Object.keys(schema?.fields).map((field, index) => {
              return (
                <div key={index}>
                  <Form.Message for={[field]} className='error' />
                </div>
              )
            })}
          </div>
        </Form>
      </Container>
    </>
  )
}
export default Login
