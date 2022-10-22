import { FormGroup, Container, Alert, Row, Col, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { DropdownList, NumberPicker } from 'react-widgets'
import Form from 'react-formal'
import * as yup from 'yup'
import { useEffect, useState } from 'react'
import { DeleteButtonWithConfirmation } from '../../components/Buttons/buttons'
import memberService from '../../api/members'
import locationService from '../../api/locations'

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
    points: yup
      .array()
      .of(member(id))
      .min(1, 'Must have at least one member')
      .required('Must have at least one member'),
    address: yup.string().required(),
    title: yup.string().required('Name is a required field')
  })

const LocationInfo = ({ location, locations, setLocations }) => {
  const address = location?.display_name
    ? location?.display_name
    : location?.address
  const title = location?.title
  const lat = location?.lat
  const lon = location?.lon

  const schema = createSchema(location?.id)
  const [form, setForm] = useState(schema.default())
  const [selectableMembers, setSelectableMembers] = useState()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const members = location?.points?.map((point) => {
    const { name } = point.member
    const { member, ...rest } = point
    return { ...rest, name }
  })

  useEffect(() => {
    const fetchData = async () => {
      const members = await memberService.getAll()
      setSelectableMembers(members)
    }
    fetchData().catch(console.error)
  }, [])

  useEffect(() => {
    setForm({ ...form, address, title, points: members })
  }, [address, selectableMembers, locations])

  const handleSubmit = async (form) => {
    const { title, address, points } = form
    const location = { title, address, lat, lon, points }
    const response = await locationService.create(location)
    setLocations(locations.concat(response))
    setForm({})
  }

  return (
    <>
      {' '}
      {!location ? (
        <Alert>Set location from map</Alert>
      ) : (
        <Form
          onSubmit={handleSubmit}
          onChange={setForm}
          schema={schema}
          value={form}
        >
          <Container>
            <div style={{ paddingBottom: '1em' }}>
              {Object.keys(schema?.fields).map((field, index) => {
                return (
                  <div key={index}>
                    <Form.Message for={[field]} className='form-errors' />
                  </div>
                )
              })}
            </div>
            <FormGroup className='mb-3' controlId='formBasicEmail'>
              <label style={{ display: 'block' }}>Address:</label>
              <Form.Field
                className='form-label'
                disabled={true}
                name='address'
              />
            </FormGroup>
            <FormGroup className='mb-3' controlId='formBasicPassword'>
              <label style={{ display: 'block' }}>Name:</label>
              <Form.Field className='form-label' name='title' />
            </FormGroup>
            <Form.FieldArray name='points'>
              {(values, arrayHelpers, meta) => (
                <>
                  {values?.map((member, index) => {
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
                              data={selectableMembers}
                              textField='name'
                              name={`points[${index}].memberId`}
                              dataKey='id'
                              mapFromValue='id'
                            />
                            <Form.Message
                              for={`points[${index}].memberId`}
                              className='form-errors'
                              style={{ paddingTop: '0.5em' }}
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
                            <DeleteButtonWithConfirmation
                              show={showDeleteModal}
                              showModal={() => setShowDeleteModal(true)}
                              handleClose={() => setShowDeleteModal(false)}
                              onClick={() => arrayHelpers.remove(member)}
                            ></DeleteButtonWithConfirmation>
                          </Col>
                        </Row>
                      </FormGroup>
                    )
                  })}
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
      )}
    </>
  )
}

LocationInfo.propTypes = {
  location: PropTypes.object,
  locations: PropTypes.array,
  setLocations: PropTypes.func
}

export default LocationInfo
