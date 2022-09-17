import { useState } from 'react'
import Leaflet from '../Leaflet/Leaflet'
import FormTab from '../FormTab/FormTab'
import { Container, Col, Row } from 'react-bootstrap'

const FrontPage = () => {
  const [location, setLocation] = useState(undefined)

  return (
    <Container>
      <Row>
        <Col>
          <Leaflet location={location} setLocation={setLocation} />
        </Col>
        <Col>
          <FormTab location={location} />
        </Col>
      </Row>
    </Container>
  )
}

export default FrontPage
