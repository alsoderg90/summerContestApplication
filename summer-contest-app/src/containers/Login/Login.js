import styles from './styles.module.css'
import { Container, Col, Form, Row } from 'react-bootstrap'

const Login = () => {
  return (
    <Container className={styles.AuthFormContainer}>
      <Form className={styles.AuthForm}>
        <div className={styles.AuthFormContent}>
          <h3 className={styles.AuthFormTitle}>Sign In</h3>
          <Form.Group className="mt-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label className={styles.AuthFormLabel}>
					Password
            </Form.Label>
            <Form.Control
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </Form.Group>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
				Submit
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
				Forgot <a href="#">password?</a>
          </p>
        </div>
      </Form>
    </Container>
  )
}	
export default Login