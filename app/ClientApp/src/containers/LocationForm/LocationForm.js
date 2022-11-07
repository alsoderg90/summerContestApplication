import React, { useEffect } from 'react'
import { Container, Alert, Row, Col, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { Field, FieldArray, Form, Formik } from 'formik'
import { TextField, Select } from 'formik-mui'
import { MenuItem, FormControl } from '@mui/material'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteButton } from 'components/Buttons/buttons'
import {
  selectLocations,
  selectLocationError
} from 'redux/modules/locations/selectors'
import { selectMembers } from 'redux/modules/members/selectors'
import { selectTeams } from 'redux/modules/teams/selectors'
import {
  createLocation,
  deleteLocation,
  editLocation
} from 'redux/modules/locations/actions'
import { getTeams } from 'redux/modules/teams/actions'
import { getMembers } from 'redux/modules/members/actions'
import ErrorComponent from 'components/ErrorComponent/ErrorComponent'
import styles from './styles.module.css'
import Notifications from 'components/Notifications/Notifications'

const member = yup.object({
  memberId: yup
    .number()
    .typeError('Insert number')
    .required('Name is required'),
  points: yup
    .number()
    .typeError('Insert number')
    .required('Points is required')
})

const createSchema = () =>
  yup.object({
    points: yup
      .array()
      .of(member)
      .min(1, 'Must have at least one member')
      .test('is-unique', 'Member already added', (points) => {
        const members = points?.map((point) => point.memberId)
        return new Set(members).size === members.length
      }),
    address: yup.string().required(),
    title: yup.string().required('Name is a required field')
  })

const LocationForm = ({ location }) => {
  const locations = useSelector((state) => selectLocations(state))
  const errors = useSelector((state) => selectLocationError(state))
  const teams = useSelector((state) => selectTeams(state))
  const selectableMembers = useSelector((state) =>
    selectMembers(state)
  )
  const dispatch = useDispatch()
  const newLocation = location?.display_name
  const address = newLocation
    ? location?.display_name
    : location?.address
  const title = location?.title
  const lat = location?.lat
  const lon = location?.lon
  const id = location?.id

  const emptyMember = { memberId: '', points: 0 }
  const points = location?.points

  const members = points?.map((point) => {
    const { memberId, points, locationId, ...rest } = point
    return { memberId, points, locationId }
  })

  const schema = createSchema()

  useEffect(() => {
    if (!selectableMembers) dispatch(getMembers())
  }, [selectableMembers])

  useEffect(() => {
    if (!teams) dispatch(getTeams())
  }, [teams])

  const handleSubmit = (
    form,
    { props, resetForm, setSubmitting }
  ) => {
    const { title, address, points } = form
    const location = { title, address, lat, lon, points }
    if (newLocation) dispatch(createLocation(location))
    else dispatch(editLocation(id, { ...location, id }))
    setSubmitting(false)
  }

  const handleDelete = (id) => {
    dispatch(deleteLocation(id))
  }

  if (errors) {
    return <ErrorComponent {...errors}></ErrorComponent>
  }

  return (
    <>
      {' '}
      {!location ? (
        <Alert>Set location from map</Alert>
      ) : (
        <>
          <Notifications />
          <Formik
            initialValues={{
              address: address,
              title: title ? title : '',
              points: members ? members : [emptyMember]
            }}
            validationSchema={schema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ values, errors, isSubmitting, isValid }) => (
              <Form autoComplete='off'>
                <Container>
                  <Row>
                    <Row className={styles.formField}>
                      <Field
                        name='address'
                        component={TextField}
                        title='Address'
                        value={address}
                      />
                    </Row>
                    <Row>
                      <Field
                        name='title'
                        type='text'
                        component={TextField}
                        label='Name'
                      />
                    </Row>
                  </Row>
                  <Row>
                    <p className={styles.membersHeader}>Members</p>
                  </Row>
                  <FieldArray name='points'>
                    {({ push, remove }) => (
                      <React.Fragment>
                        {values.points.map((point, index) => (
                          <Row
                            key={index}
                            style={{ marginBottom: '1em' }}
                          >
                            <Col xs={5} style={{ paddingLeft: 0 }}>
                              <FormControl fullWidth>
                                <Field
                                  name={`points[${index}.memberId`}
                                  component={Select}
                                  label='Member'
                                  type='number'
                                  data-testing-id={`member-${index}`}
                                >
                                  {selectableMembers?.map((sm) => (
                                    <MenuItem
                                      key={sm.id}
                                      value={sm.id}
                                    >
                                      {sm.name}{' '}
                                    </MenuItem>
                                  ))}
                                </Field>
                              </FormControl>
                            </Col>
                            <Col xs={4}>
                              <Field
                                name={`points[${index}].points`}
                                component={TextField}
                                label='Points'
                                type='number'
                                data-testing-id={`member-${index}-points`}
                              />
                            </Col>
                            <Col>
                              <DeleteButton
                                onClick={() => remove(index)}
                              >
                                Delete
                              </DeleteButton>
                            </Col>
                          </Row>
                        ))}
                        <Row>
                          <Col>
                            {typeof errors.points === 'string' ? (
                              <p style={{ color: 'red' }}>
                                {' '}
                                {errors.points}
                              </p>
                            ) : null}
                          </Col>
                        </Row>
                        <Row>
                          <Col style={{ paddingLeft: 0 }}>
                            <Button
                              type='default'
                              onClick={() => push(emptyMember)}
                            >
                              Add Member
                            </Button>{' '}
                            <Button type='submit' variant='success'>
                              Submit
                            </Button>{' '}
                            <DeleteButton
                              onClick={() =>
                                handleDelete(location.id)
                              }
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
        </>
      )}
    </>
  )
}

LocationForm.propTypes = {
  location: PropTypes.object
}

export default LocationForm
