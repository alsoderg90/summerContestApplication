import { FormGroup, Container, Row, Col, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { DropdownList, NumberPicker } from 'react-widgets'
import Form from 'react-formal'
import * as yup from 'yup'
import { BsFillTrashFill } from 'react-icons/bs'
import { useEffect, useState } from 'react'

let members = [
  { name: 'John Doe', points: 5 },
  { name: 'Jane Doe', points: 2 },
  { name: 'Jack Doe', points: 5 },
  { name: 'Jill Doe', points: 2 }
]

const member = yup.object({
  name: yup.string().required('Required'),
  points: yup.string().required('Required').default(0)
})

const createSchema = () =>
  yup.object({
    members: yup.array().of(member).min(1, 'Must have at least one member')
  })

const LocationInfo = ({ location }) => {
  const road = location?.address?.road ? location.address.road : ''
  const houseNumber = location?.address?.house_number
    ? location.address.house_number
    : ''
  const address = `${road} ${houseNumber}`

  const schema = createSchema()
  const [form, setForm] = useState(schema.default())

  useEffect(() => {
    setForm({ ...form, address })
  }, [address, members])

  const handleSubmit = (formValue) => {
    alert(JSON.stringify({ ...formValue, location }, null, 2))
  }
  console.log(members)
  return (
    <Form
      onSubmit={handleSubmit}
      schema={schema}
      defaultValue={{
        members: [
          { name: 'John Doe', points: 5 },
          { name: 'Jane Doe', points: 2 }
        ]
      }}
    >
      {address}
      <Container>
        <Form.FieldArray name='members'>
          {(values, arrayHelpers, meta) => (
            <>
              {values
                //?.sort((a, b) => b.points + a.points)
                .map((member, index) => {
                  return (
                    <FormGroup
                      key={index}
                      className='mb-3'
                      controlId='formBasicPassword'
                    >
                      <Row>
                        <Col>
                          <label>Name:</label>
                          <Form.Field
                            as={DropdownList}
                            data={members}
                            textField='name'
                            name={`members[${index}].name`}
                            dataKey='id'
                            mapFromValue={(fieldValue) => `${fieldValue.name}`}
                          />
                          <Form.Message
                            for={`members[${index}].name`}
                            className='error -mt-2'
                          />
                        </Col>
                        <Col>
                          <label>Points:</label>
                          <Form.Field
                            as={NumberPicker}
                            name={`members[${index}].points`}
                          />
                          <Form.Message
                            for={`members[${index}].points`}
                            className='error -mt-2'
                          />
                        </Col>
                        <Col>
                          <label style={{ display: 'block' }}>Delete:</label>
                          <Button
                            variant='danger'
                            onClick={() => arrayHelpers.remove(member)}
                          >
                            <BsFillTrashFill />
                          </Button>
                        </Col>
                      </Row>
                    </FormGroup>
                  )
                })}
              <Form.Message for={'members'} className='error' />
              <Row>
                <Col>
                  <Button
                    variant='secondary'
                    onClick={() => {
                      const newMember = { id: 120, name: '', points: 0 }
                      arrayHelpers.push(newMember)
                    }}
                  >
                    Add Member
                  </Button>{' '}
                  <Button type='submit'>Submit</Button>
                </Col>
              </Row>
            </>
          )}
        </Form.FieldArray>
      </Container>
    </Form>
  )
}

LocationInfo.propTypes = {
  location: PropTypes.object
}

export default LocationInfo
