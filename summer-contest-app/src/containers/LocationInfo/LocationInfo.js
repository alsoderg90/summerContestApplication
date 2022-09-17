import { Alert, FormGroup, Container, Row, Col, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { Combobox, NumberPicker } from 'react-widgets'
import Form from 'react-formal'
import * as yup from 'yup'
import { useEffect, useState } from 'react'

let members1 = [
  { id: 0, name: 'arto', team: 'joukkue1', points: 5 },
  { id: 1, name: 'heikki', team: 'joukkue2', points: 2 },
  { id: 2, name: 'tiina', team: 'joukkue2', points: 10 },
  { id: 3, name: 'jukka', team: 'joukkue1', points: 0 }
].sort((a, b) => b.points - a.points)

const createSchema = (members) => {
  const validationObject = {}
  members.forEach((member, index) => {
    validationObject[`name-${index}`] = yup
      .string()
      .required()
      .default(member?.name)
    validationObject[`points-${index}`] = yup
      .number()
      .required()
      .default(member?.points)
    if (index === members.length - 1) {
      validationObject[`name-${index + 1}`] = yup.string().required()
      validationObject[`points-${index + 1}`] = yup
        .number()
        .required()
        .default(0)
    }
  })
  return yup.object(validationObject)
}

const LocationInfo = ({ location }) => {
  const road = location?.address?.road ? location.address.road : ''
  const houseNumber = location?.address?.house_number
    ? location.address.house_number
    : ''
  const address = `${road} ${houseNumber}`

  const [members, setMembers] = useState(members1)
  const schema = createSchema(members)
  const [form, setForm] = useState(schema.default())

  useEffect(() => {
    setForm({ ...form, address })
  }, [address, members])

  const handleChange = (form) => {
    setForm(form)
    schema.isValidSync() !!
      setMembers(
        members.concat({ name: undefined, points: 0, team: undefined })
      )
  }

  const handleSubmit = (formData) => {
    alert(JSON.stringify(formData, null, 2))
  }

  return (
    <Form
      value={form}
      schema={schema}
      onChange={handleChange}
      onSubmit={handleSubmit}
      defaultValue={schema.default()}
    >
      {!location ? (
        <Alert>Choose from map</Alert>
      ) : (
        <>
          {address}
          <FormGroup className='mb-3' controlId='formBasicPassword'>
            <Container>
              {members
                ?.sort((a, b) => b.points - a.points)
                .map((member, index) => {
                  return (
                    <Row key={index}>
                      <Col>
                        <label>
                          Name:
                          <Form.Field
                            as={Combobox}
                            data={members}
                            dataKey='id'
                            textField='name'
                            name={`name-${index}`}
                            defaultValue={member?.name}
                          />
                          <Form.Field
                            as={NumberPicker}
                            defaultValue={member?.points}
                            name={`points-${index}`}
                          />
                        </label>
                      </Col>
                    </Row>
                  )
                })}
              <Row key={members.length}>
                <Col>
                  <label>
                    Name:
                    <Form.Field
                      as={Combobox}
                      data={members}
                      dataKey='id'
                      textField='name'
                      name={`name-${members.length}`}
                    />
                    <Form.Field
                      as={NumberPicker}
                      defaultValue={0}
                      name={`points-${members.length}`}
                    />
                  </label>
                </Col>
              </Row>
            </Container>
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

LocationInfo.propTypes = {
  location: PropTypes.object
}

export default LocationInfo
