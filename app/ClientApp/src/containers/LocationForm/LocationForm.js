import { Alert, FormGroup, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import Form from 'react-formal'
import * as yup from 'yup'
import { useEffect, useState } from 'react'
import checkpointsService from '../../api/checkpoints'

const createSchema = () => {
  return yup.object({
    address: yup.string().required(),
    name: yup.string().required()
  })
}

const LocationForm = ({ location }) => {
  const road = location?.address?.road ? location.address.road : ''
  const houseNumber = location?.address?.house_number
    ? location.address.house_number
    : ''
  const address = `${road} ${houseNumber}`
  const lat = location?.lat
  const lon = location?.lon
  const schema = createSchema()
  const [form, setForm] = useState()

  useEffect(() => {
    setForm({ ...form, address, lat, lon })
  }, [address])

  const handleSubmit = (formData) => {
    console.log(formData)
    checkpointsService.create(formData)
  }

  return (
    <Form
      value={form}
      schema={schema}
      onChange={setForm}
      onSubmit={handleSubmit}
      className='location-form'
    >
      {!location ? (
        <Alert>Set location from map</Alert>
      ) : (
        <>
          <FormGroup className='mb-3' controlId='formBasicEmail'>
            <label style={{ display: 'block' }}>Address:</label>
            <Form.Field className='form-label' disabled={true} name='address' />
          </FormGroup>
          <FormGroup className='mb-3' controlId='formBasicPassword'>
            <label style={{ display: 'block' }}>Name:</label>
            <Form.Field className='form-label' name='name' />
          </FormGroup>
          {Object.keys(schema?.fields).map((field, index) => {
            return (
              <div key={index}>
                <Form.Message for={[field]} className='error' />
              </div>
            )
          })}
          <Button type='submit'>Submit</Button>
        </>
      )}
    </Form>
  )
}

LocationForm.propTypes = {
  location: PropTypes.object
}

export default LocationForm
