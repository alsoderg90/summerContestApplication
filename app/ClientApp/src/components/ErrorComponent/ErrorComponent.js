import { Button, Card } from 'react-bootstrap'
import PropTypes from 'prop-types'
import styles from './styles.module.css'
import { useNavigate } from 'react-router'

const JsErrorComponent = ({ error, resetErrorBoundary }) => {
  const navigate = useNavigate()
  return (
    <Card>
      <Card.Header as='h3' className={styles.errorHeader}>
        Something went wrong, please try again
      </Card.Header>
      <Card.Body>
        <Card.Text>Please go back to previous page or try again.</Card.Text>
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

export default JsErrorComponent
