import { useState } from 'react'
import Leaflet from '../Leaflet/Leaflet'
import FormTab from '../FormTab/FormTab'
import { Container, Col, Row } from 'react-bootstrap'

const FrontPage = () => {
  const [location, setLocation] = useState(undefined)
  const [activeTab, setActiveTab] = useState('location')
  return (
    <Container>
      <Row>
        <Col lg={true}>
          <Leaflet
            location={location}
            setLocation={setLocation}
            setActiveTab={setActiveTab}
          />
        </Col>
        <Col>
          <FormTab
            location={location}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default FrontPage
