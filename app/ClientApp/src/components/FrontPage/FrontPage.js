import { useState } from 'react'
import { useSelector } from 'react-redux'
import Leaflet from '../Leaflet/Leaflet'
import FormTabs from '../FormTab/FormTabs'
import { Container, Col, Row } from 'react-bootstrap'
import {
  selectNewLocation,
  selectSelectedLocation
} from '../../redux/modules/locations/selectors'

const FrontPage = () => {
  const newLocation = useSelector((state) => selectNewLocation(state))
  const selectedLocation = useSelector((state) => selectSelectedLocation(state))
  const [activeTab, setActiveTab] = useState('info')

  return (
    <Container>
      <Row>
        <Col lg={true}>
          <Leaflet newLocation={newLocation} setActiveTab={setActiveTab} />
        </Col>
        <Col>
          <FormTabs
            location={newLocation ? newLocation : selectedLocation}
            activeTab={activeTab}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default FrontPage
