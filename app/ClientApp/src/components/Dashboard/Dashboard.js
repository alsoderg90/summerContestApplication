import { Container, Row, Col } from 'react-bootstrap'
import Teams from '../../containers/Teams/Teams'
import Members from '../../containers/Members/Members'

const Dashboard = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Teams />
        </Col>
        <Col>
          <Members />
        </Col>
      </Row>
    </Container>
  )
}

export default Dashboard
