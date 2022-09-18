import { Container, Row, Col } from 'react-bootstrap'
import TeamForm from '../../containers/TeamForm/TeamForm'
import MemberForm from '../../containers/MemberForm/MemberForm'

const Dashboard = () => {
  return (
    <Container>
      <Row>
        <Col>
          <TeamForm />
        </Col>
        <Col>
          <MemberForm />
        </Col>
      </Row>
    </Container>
  )
}

export default Dashboard
