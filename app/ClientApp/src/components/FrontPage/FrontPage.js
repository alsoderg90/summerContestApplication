import { useState, useEffect } from 'react'
import Leaflet from '../Leaflet/Leaflet'
import FormTabs from '../FormTab/FormTabs'
import { Container, Col, Row } from 'react-bootstrap'
import checkpointsService from '../../api/checkpoints'

const FrontPage = () => {
  const [newLocation, setNewLocation] = useState(undefined)
  const [activeTab, setActiveTab] = useState('info')
  const [selectedLocation, setSelectedLocation] = useState(undefined)
  const [isNewLocation, setIsNewLocation] = useState(false)
  const [locations, setLocations] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const res = await checkpointsService.getAll()
      setLocations(res.data)
    }
    fetchData().catch(console.error)
  }, [])

  return (
    <Container>
      <Row>
        <Col lg={true}>
          <Leaflet
            newLocation={newLocation}
            setNewLocation={setNewLocation}
            setActiveTab={setActiveTab}
            setSelectedLocation={setSelectedLocation}
            setIsNewLocation={setIsNewLocation}
            locations={locations}
          />
        </Col>
        <Col>
          <FormTabs
            location={isNewLocation ? newLocation : selectedLocation}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            selectedLocation={selectedLocation}
            setLocations={setLocations}
            locations={locations}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default FrontPage
