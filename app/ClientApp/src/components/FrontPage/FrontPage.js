import { useState } from 'react'
import { useSelector } from 'react-redux'
import Leaflet from '../Leaflet/Leaflet'
import FormTabs from '../FormTabs/FormTabs'
import { Container, Col, Row } from 'react-bootstrap'
import {
  selectNewLocation,
  selectSelectedLocation
} from 'redux/modules/locations/selectors'
import LocationForm from 'containers/LocationForm/LocationForm'
import LocationInfo from 'components/LocationInfo/LocationInfo'

const FrontPage = () => {
  const newLocation = useSelector((state) => selectNewLocation(state))
  const selectedLocation = useSelector((state) => selectSelectedLocation(state))
  const [activeTab, setActiveTab] = useState('Locations')

  const tabs = [
    <LocationForm
      key='Locations'
      location={newLocation ? newLocation : selectedLocation}
      name={`${newLocation ? 'Add' : 'Edit'} location`}
    ></LocationForm>
  ]

  if (selectedLocation) {
    tabs.push(
      <LocationInfo
        name='Stats'
        key='Stats'
        location={selectedLocation}
      ></LocationInfo>
    )
  }

  return (
    <Container>
      <Row>
        <Col xl={8}>
          <Leaflet newLocation={newLocation} />
        </Col>
        <p></p>
        <Col>
          <FormTabs tabs={tabs} activeTab={activeTab} />
        </Col>
      </Row>
    </Container>
  )
}

export default FrontPage
