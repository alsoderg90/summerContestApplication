import { Alert, FormGroup, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import Form from 'react-formal'
import * as yup from 'yup'
import { useEffect, useState } from 'react'

const createSchema = (address) => {
  return yup.object({
    address: yup.string().required().default(address),
    name: yup.string().required()
  })
}

const LocationForm = ({ location }) => {
  const road = location?.address?.road ? location.address.road : ''
  const houseNumber = location?.address?.house_number
    ? location.address.house_number
    : ''
  const address = `${road} ${houseNumber}`

  const schema = createSchema(address)
  const [form, setForm] = useState(schema.default())

  useEffect(() => {
    setForm({ ...form, address })
  }, [address])

  const handleSubmit = (formData) => {
    alert(JSON.stringify(formData, null, 2))
  }

  return (
    <Form
      value={form}
      schema={schema}
      onChange={setForm}
      onSubmit={handleSubmit}
      defaultValue={schema.default()}
    >
      {!location ? (
        <Alert>Set location from map</Alert>
      ) : (
        <>
          <FormGroup className='mb-3' controlId='formBasicEmail'>
            <label>
              Address:
              <Form.Field name='address' />
            </label>
          </FormGroup>
          <FormGroup className='mb-3' controlId='formBasicPassword'>
            <label>
              Name:
              <Form.Field name='name' />
            </label>
          </FormGroup>
          {Object.keys(schema?.fields).map((field, index) => {
            return (
              <div key={index}>
                <Form.Message for={[field]} className='error' />
              </div>
            )
          })}
          <Form.Submit>Submit</Form.Submit>
        </>
      )}
    </Form>
  )
}

LocationForm.propTypes = {
  location: PropTypes.object
}

export default LocationForm
