import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import PropTypes from 'prop-types'

import LocationInfo from '../../containers/LocationInfo/LocationInfo'

const FormTabs = ({ location, activeTab, setLocations, locations }) => {
  return (
    <Tabs defaultActiveKey='location' activeKey={activeTab} className='mb-3'>
      <Tab eventKey='info' title='Info'>
        <LocationInfo
          location={location}
          setLocations={setLocations}
          locations={locations}
        ></LocationInfo>
      </Tab>
    </Tabs>
  )
}

FormTabs.propTypes = {
  location: PropTypes.object,
  activeTab: PropTypes.string,
  setActiveTab: PropTypes.func,
  setLocations: PropTypes.func,
  locations: PropTypes.array
}

export default FormTabs
