import { useState } from 'react'
import Leaflet from '../Leaflet/Leaflet'
import LocationForm from '../LocationForm/LocationForm'
import { Container, Col, Row } from 'react-bootstrap'

const FrontPage = () => {

  const [ location, setLocation ] = useState(undefined)

  return (
    <Container>
      <Row>
        <Col>
          <Leaflet setLocation={setLocation}/>
        </Col>
        <Col>
          <LocationForm location={location}/>
        </Col>
      </Row>
    </Container>
  )
}

export default FrontPage