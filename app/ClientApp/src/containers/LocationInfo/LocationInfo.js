import React, { useEffect, useState } from 'react'
import { Container, Alert, Row, Col, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { Field, FieldArray, Form, Formik } from 'formik'
import { TextField, Select } from 'formik-mui'
import { MenuItem } from '@mui/material'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteButton } from '../../components/Buttons/buttons'
import { selectLocations } from '../../redux/modules/locations/selectors'
import { selectMembers } from '../../redux/modules/members/selectors'
import {
  createLocation,
  deleteLocation
} from '../../redux/modules/locations/actions'
import { getMembers } from '../../redux/modules/members/actions'

const emptyMember = { memberId: '', points: '' }

const member = yup.object({
  memberId: yup
    .number()
    .typeError('Insert number')
    .required('Name is required'),
  points: yup.number().typeError('Insert number').required('Points is required')
})

const createSchema = () =>
  yup.object({
    points: yup
      .array()
      .of(member)
      .min(1, 'Must have at least one member')
      .test('is-unique', 'Member already added', (points, context) => {
        const members = points?.map((point) => point.memberId)
        return new Set(members).size === members.length
      }),
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

  const schema = createSchema()
  const [form, setForm] = useState()

  const members = location?.points?.map((point) => {
    const { name } = point.member
    const { member, ...rest } = point
    return { ...rest, name }
  })

  useEffect(() => {
    if (!selectableMembers) dispatch(getMembers())
  }, [selectableMembers])

  useEffect(() => {
    setForm({ ...form, address, title, points: members })
  }, [address, selectableMembers, locations, location])

  const handleSubmit = (form, { props, resetForm, setSubmitting }) => {
    const { title, address, points } = form
    const location = { title, address, lat, lon, points }
    dispatch(createLocation(location))
    setSubmitting(false)
    resetForm()
  }

  const handleDelete = (id) => {
    dispatch(deleteLocation(id))
  }

  return (
    <>
      {' '}
      {!location ? (
        <Alert>Set location from map</Alert>
      ) : (
        <Formik
          initialValues={{
            address: address,
            title: '5',
            points: [emptyMember]
          }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, isSubmitting, isValid }) => (
            <Form autoComplete='off'>
              <Container>
                <Col>
                  <Field
                    name='address'
                    component={TextField}
                    title='Address'
                    value={address}
                  />
                  <Field
                    name='title'
                    type='text'
                    component={TextField}
                    label='Name'
                  />
                </Col>
                <Row>
                  {typeof errors.points === 'string' ? (
                    <p color='error'></p>
                  ) : null}
                </Row>
                <FieldArray name='points'>
                  {({ push, remove }) => (
                    <React.Fragment>
                      <Row>
                        <p>Members</p>
                      </Row>

                      {values.points.map((_, index) => (
                        <Row key={index} style={{ marginBottom: '1em' }}>
                          <Col>
                            <Field
                              name={`points[${index}.memberId`}
                              component={Select}
                              label='Name'
                              type='number'
                            >
                              {selectableMembers?.map((sm) => (
                                <MenuItem key={sm.id} value={sm.id}>
                                  {sm.name}{' '}
                                </MenuItem>
                              ))}
                            </Field>
                            <Field
                              name={`points[${index}].points`}
                              component={TextField}
                              label='Points'
                              type='number'
                            />
                            <DeleteButton
                              onClick={() => remove(index)}
                              style={{ marginLeft: '1em' }}
                            >
                              Delete
                            </DeleteButton>
                          </Col>
                        </Row>
                      ))}
                      <Row>
                        <Col>
                          {typeof errors.points === 'string' ? (
                            <p style={{ color: 'red' }}> {errors.points}</p>
                          ) : null}
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Button onClick={() => push(emptyMember)}>
                            Add Member
                          </Button>{' '}
                          <Button type='submit' color='primary'>
                            Submit
                          </Button>{' '}
                          <DeleteButton
                            onClick={() => handleDelete(location.id)}
                          ></DeleteButton>
                        </Col>
                      </Row>
                    </React.Fragment>
                  )}
                </FieldArray>
              </Container>
              {/* <pre>{JSON.stringify({ values, errors }, null, 4)}</pre> */}
            </Form>
          )}
        </Formik>
      )}
    </>
  )
}

LocationInfo.propTypes = {
  location: PropTypes.object
}

export default LocationInfo
