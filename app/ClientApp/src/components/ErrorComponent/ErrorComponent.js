import { useState } from 'react'
import { Button, Card, Modal } from 'react-bootstrap'
import PropTypes from 'prop-types'
import styles from './styles.module.css'
import { useNavigate } from 'react-router'
import { RefreshButton } from '../Buttons/buttons'

export const JsErrorComponent = ({ error, resetErrorBoundary }) => {
  const navigate = useNavigate()
  return (
    <Card>
      <Card.Header as='h3' className={styles.errorHeader}>
        Something went wrong, please try again
      </Card.Header>
      <Card.Body>
        <Card.Text>
          Please go back to previous page or try again.
        </Card.Text>
        <Button onClick={() => navigate(-1)}>Back</Button>{' '}
        <Button onClick={resetErrorBoundary}>Try Again</Button>
      </Card.Body>
    </Card>
  )
}
JsErrorComponent.propTypes = {
  error: PropTypes.object,
  resetErrorBoundary: PropTypes.func
}

const DefaultErrorComponent = ({ message, status }) => {
  const [show, setShow] = useState(true)
  const handleClose = () => setShow(false)

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>{`Error: ${status}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h2>{status == 401 ? 'Access denied' : message}</h2>
      </Modal.Body>
      <Modal.Footer>
        <RefreshButton></RefreshButton>
      </Modal.Footer>
    </Modal>
  )
}

DefaultErrorComponent.propTypes = {
  status: PropTypes.number,
  message: PropTypes.string
}

export default DefaultErrorComponent
