import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import PropTypes from 'prop-types'

import LocationForm from '../../containers/LocationForm/LocationForm'
import LocationInfo from '../../containers/LocationInfo/LocationInfo'

const FormTab = ({ location, activeTab }) => {
  return (
    <Tabs defaultActiveKey='location' activeKey={activeTab} className='mb-3'>
      <Tab eventKey='location' title='Add Location'>
        <LocationForm location={location} />
      </Tab>
      <Tab eventKey='info' title='Info'>
        <LocationInfo location={location}></LocationInfo>
      </Tab>
    </Tabs>
  )
}

FormTab.propTypes = {
  location: PropTypes.object,
  activeTab: PropTypes.string,
  setActiveTab: PropTypes.func
}

export default FormTab
