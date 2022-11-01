import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import PropTypes from 'prop-types'

const FormTabs = ({ tabs }) => {
  return (
    <>
      {tabs ? (
        <Tabs defaultActiveKey={tabs[0].key} className='mb-3'>
          {tabs.map((tab) => (
            <Tab key={tab.key} eventKey={tab.key} title={tab.props.name}>
              {tab}
            </Tab>
          ))}
        </Tabs>
      ) : (
        <></>
      )}
    </>
  )
}

FormTabs.propTypes = {
  location: PropTypes.object,
  tabs: PropTypes.array
}

export default FormTabs
