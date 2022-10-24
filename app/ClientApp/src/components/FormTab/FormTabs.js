import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import PropTypes from 'prop-types'

import LocationInfo from '../../containers/LocationInfo/LocationInfo'

const FormTabs = ({ location, activeTab }) => {
  return (
    <Tabs defaultActiveKey='location' activeKey={activeTab} className='mb-3'>
      <Tab eventKey='info' title='Info'>
        <LocationInfo location={location}></LocationInfo>
      </Tab>
    </Tabs>
  )
}

FormTabs.propTypes = {
  location: PropTypes.object,
  activeTab: PropTypes.string
}

export default FormTabs
