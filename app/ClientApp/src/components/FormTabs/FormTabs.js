import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import PropTypes from 'prop-types'

const FormTabs = ({ tabs, activeKey, handleClick }) => {
  const handleSelect = (key) => {
    handleClick(key)
  }
  return (
    <>
      {tabs ? (
        <Tabs
          defaultActiveKey={tabs[0].key}
          className='mb-3'
          onSelect={handleSelect}
          activeKey={handleClick ? activeKey : undefined}
        >
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
  activeKey: PropTypes.string,
  handleClick: PropTypes.func,
  tabs: PropTypes.array
}

export default FormTabs
