import { useState } from 'react'
import { useSelector } from 'react-redux'
import Leaflet from '../Leaflet/Leaflet'
import FormTabs from '../FormTabs/FormTabs'
import { Container, Col, Row } from 'react-bootstrap'
import {
  selectNewLocation,
  selectSelectedLocation
} from 'redux/modules/locations/selectors'
import LocationInfo from 'containers/LocationInfo/LocationInfo'

const FrontPage = () => {
  const newLocation = useSelector((state) => selectNewLocation(state))
  const selectedLocation = useSelector((state) => selectSelectedLocation(state))
  const [activeTab, setActiveTab] = useState('Locations')

  const tabs = [
    <LocationInfo
      key='Locations'
      location={newLocation ? newLocation : selectedLocation}
      name='Locations'
    ></LocationInfo>
  ]

  return (
    <Container>
      <Row>
        <Col lg={true}>
          <Leaflet newLocation={newLocation} />
        </Col>
        <Col>
          <FormTabs tabs={tabs} activeTab={activeTab} />
        </Col>
      </Row>
    </Container>
  )
}

export default FrontPage
