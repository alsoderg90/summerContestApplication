import { FormGroup, Container, Row, Col, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { DropdownList, NumberPicker } from 'react-widgets'
import Form from 'react-formal'
import * as yup from 'yup'
import { BsFillTrashFill } from 'react-icons/bs'
import { useEffect, useState } from 'react'
import memberService from '../../api/members'
import checkpointsService from '../../api/checkpoints'
import LocationMembers from '../../api/LocationMembers'

const member = (id) =>
  yup.object({
    memberId: yup.number().required('Required'),
    points: yup.number().required('Required').default(0),
    locationId: yup.number().nullable().default(null),
    location: yup.object().nullable().default(null),
    member: yup.object().nullable().default(null)
  })

const createSchema = (id) =>
  yup.object({
    points: yup.array().of(member(id)).min(1, 'Must have at least one member'),
    address: yup.string(),
    title: yup.string()
  })

const LocationInfo = ({ location }) => {
  //   const road = location?.address?.road ? location.address.road : ''
  //   const houseNumber = location?.address?.house_number
  //     ? location.address.house_number
  //     : ''
  const address = location?.display_name
  const lat = location?.lat
  const lon = location?.lon

  const schema = createSchema(location?.id)
  const [form, setForm] = useState(schema.default())
  const [members, setMembers] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const res = await LocationMembers.getAll()
      const members = res.data
      setMembers(members)
    }
    fetchData().catch(console.error)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const res = await memberService.getAll()
      const members = res.data
      setMembers(members)
    }
    fetchData().catch(console.error)
  }, [])

  useEffect(() => {
    setForm({ ...form, address })
  }, [address, members])

  const handleSubmit = (form) => {
    const { title, address, points } = form
    checkpointsService.create({ title, address, lat, lon, points })
  }

  return (
    <Form
      onSubmit={handleSubmit}
      onChange={setForm}
      schema={schema}
      defaultValue={{
        members: members
      }}
      value={form}
    >
      <Container>
        <FormGroup className='mb-3' controlId='formBasicEmail'>
          <label style={{ display: 'block' }}>Address:</label>
          <Form.Field className='form-label' disabled={true} name='address' />
        </FormGroup>
        <FormGroup className='mb-3' controlId='formBasicPassword'>
          <label style={{ display: 'block' }}>Name:</label>
          <Form.Field className='form-label' name='title' />
        </FormGroup>
        {Object.keys(schema?.fields).map((field, index) => {
          return (
            <div key={index}>
              <Form.Message for={[field]} className='error' />
            </div>
          )
        })}
        <Form.FieldArray name='points'>
          {(values, arrayHelpers, meta) => (
            <>
              {values
                //?.sort((a, b) => b.points + a.points)
                ?.map((member, index) => {
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
                            name={`points[${index}].memberId`}
                            dataKey='id'
                            mapFromValue='id'
                          />
                          <Form.Message
                            for={`points[${index}].name`}
                            className='error -mt-2'
                          />
                        </Col>
                        <Col>
                          <label>Points:</label>
                          <Form.Field
                            as={NumberPicker}
                            name={`points[${index}].points`}
                          />
                          <Form.Message
                            for={`points[${index}].points`}
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
                      arrayHelpers.push({})
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
