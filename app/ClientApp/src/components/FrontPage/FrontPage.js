import { useState } from 'react'
import Leaflet from '../Leaflet/Leaflet'
import FormTabs from '../FormTab/FormTabs'
import { Container, Col, Row } from 'react-bootstrap'

const FrontPage = () => {
  const [location, setLocation] = useState(undefined)
  const [activeTab, setActiveTab] = useState('info')
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
          <FormTabs
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
