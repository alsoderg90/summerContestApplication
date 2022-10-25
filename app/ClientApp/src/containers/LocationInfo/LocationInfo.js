import { useEffect, useState } from 'react'
import { FormGroup, Container, Alert, Row, Col, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { DropdownList, NumberPicker } from 'react-widgets'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import Form from 'react-formal'

import { selectLocations } from '../../redux/modules/locations/selectors'
import { selectMembers } from '../../redux/modules/members/selectors'
import { DeleteButtonWithConfirmation } from '../../components/Buttons/buttons'
import { createLocation } from '../../redux/modules/locations/actions'
import { getMembers } from '../../redux/modules/members/actions'

const member = () =>
  yup.object({
    memberId: yup.number().required('Required'),
    points: yup.number().required('Required'),
    locationId: yup.number().nullable().default(null),
    location: yup.object().nullable().default(null),
    member: yup.object().nullable().default(null)
  })

const createSchema = () =>
  yup.object({
    points: yup
      .array()
      .of(member())
      .min(1, 'Must have at least one member')
      .required('Must have at least one member'),
    address: yup.string().required(),
    title: yup.string().required('Name is a required field')
  })

const LocationInfo = ({ location }) => {
  const locations = useSelector((state) => selectLocations(state))
  const selectableMembers = useSelector((state) => selectMembers(state))
  const dispatch = useDispatch()
  const address = location?.display_name
    ? location?.display_name
    : location?.address
  const title = location?.title
  const lat = location?.lat
  const lon = location?.lon

  const schema = createSchema(location?.id)
  const [form, setForm] = useState(schema.default())
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const members = location?.points?.map((point) => {
    const { name } = point.member
    const { member, ...rest } = point
    return { ...rest, name }
  })

  useEffect(() => {
    if (!selectableMembers) dispatch(getMembers())
  }, [])

  useEffect(() => {
    setForm({ ...form, address, title, points: members })
  }, [address, selectableMembers, locations, location])

  const handleSubmit = (form) => {
    const { title, address, points } = form
    const location = { title, address, lat, lon, points }
    dispatch(createLocation(location))
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
                              name={`points[${index}].memberId`}
                              className='form-errors'
                              style={{ paddingTop: '0.5em' }}
                            />
                          </Col>
                          <Col>
                            <label>Points:</label>
                            <Form.Field
                              as={NumberPicker}
                              name={`points[${index}].points`}
                              defaultValue={0}
                            />
                            <Form.Message
                              name={`points[${index}].points`}
                              className='form-errors'
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
  location: PropTypes.object
}

export default LocationInfo
