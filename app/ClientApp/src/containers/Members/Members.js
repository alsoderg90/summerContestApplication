import { useEffect, useState } from 'react'
import {
  Container,
  Col,
  Row,
  Image,
  Button,
  Table,
  ButtonGroup
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import { Field, Form, Formik } from 'formik'
import { TextField, Autocomplete } from 'formik-mui'
import MuiTextField from '@mui/material/TextField'
import { COUNTRY_LIST } from './constants'
import Charts from 'components/Charts/Charts'
import FormTabs from 'components/FormTabs/FormTabs'
import restCountriesService from 'api/restcountries'
import {
  getMembers,
  createMember,
  deleteMember,
  editMember
} from 'redux/modules/members/actions'
import { getTeams } from 'redux/modules/teams/actions'
import { getUserPoints } from 'utils/functions'
import {
  selectMembers,
  selectMembersError
} from 'redux/modules/members/selectors'
import { selectTeams } from 'redux/modules/teams/selectors'
import { DeleteButton, EditButton } from 'components/Buttons/buttons'
import ErrorComponent from 'components/ErrorComponent/ErrorComponent'
import styles from './styles.module.css'
import { selectLocations } from 'redux/modules/locations/selectors'
import { getLocations } from 'redux/modules/locations/actions'
import Notifications from 'components/Notifications/Notifications'
import { selectNotification } from 'redux/helpers/notifications/selectors'

const defaultMember = { name: '', nationality: 'Finland' }

const createSchema = () => {
  return yup.object({
    name: yup.string().required('Name is a required field'),
    nationality: yup
      .string()
      .typeError('Nationality is required field')
      .required('Nationality is required field')
  })
}

const Members = () => {
  const dispatch = useDispatch()
  const members = useSelector((state) => selectMembers(state))
  const teams = useSelector((state) => selectTeams(state))
  //   const notifications = useSelector((state) =>
  //     selectNotification(state)
  //   )
  const errors = useSelector((state) => selectMembersError(state))
  const locations = useSelector((state) => selectLocations(state))
  const [activeKey, setActiveKey] = useState('Form')
  const [editableMember, setEditableMember] = useState()
  const schema = createSchema()

  useEffect(() => {
    if (!teams) dispatch(getTeams())
  }, [teams])

  useEffect(() => {
    if (!members) dispatch(getMembers())
  }, [members])

  useEffect(() => {
    if (!locations) dispatch(getLocations())
  }, [locations])

  const handleSubmit = async (
    formData,
    { props, resetForm, setSubmitting }
  ) => {
    const response = await restCountriesService.get(formData)
    const newMember = { ...formData, flagUrl: response }
    dispatch(createMember(newMember))
    setSubmitting(false)
    resetForm()
  }

  const handleDelete = (id) => {
    dispatch(deleteMember(id))
  }

  const handleEdit = async (
    formData,
    { resetForm, setSubmitting }
  ) => {
    const response = await restCountriesService.get(formData)
    const editedMember = { ...formData, flagUrl: response }
    dispatch(editMember(editedMember.id, editedMember))
    setSubmitting(false)
  }

  if (errors) {
    return <ErrorComponent {...errors}></ErrorComponent>
  }

  return (
    <Container>
      <Notifications />
      <Row>
        <Col>
          <FormTabs
            handleClick={(key) => {
              setActiveKey(key)
              setEditableMember(undefined)
            }}
            activeKey={activeKey}
            tabs={[
              <Table
                key='Members'
                name='Members'
                striped
                bordered
                hover
              >
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Nationality</th>
                    <th>Points</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {members?.map((member, index) => (
                    <tr key={index}>
                      <td>{member.name}</td>
                      <td>
                        <Image
                          alt={member.nationality}
                          width={100}
                          height={40}
                          src={member.flagUrl}
                        ></Image>
                      </td>
                      <td>
                        {getUserPoints(member.points, member.id)}
                      </td>
                      <td>
                        <ButtonGroup>
                          <DeleteButton
                            onClick={() => handleDelete(member.id)}
                          ></DeleteButton>
                          <EditButton
                            onClick={() => {
                              setActiveKey('Form')
                              setEditableMember(member)
                            }}
                          ></EditButton>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>,
              <Charts
                key='Charts'
                name='Charts'
                data={members}
              ></Charts>,
              <Col sm={4} key='Form' name='Form'>
                <p></p>
                <Formik
                  initialValues={
                    editableMember ? editableMember : defaultMember
                  }
                  onSubmit={
                    editableMember ? handleEdit : handleSubmit
                  }
                  validationSchema={schema}
                  enableReinitialize
                >
                  {({ errors, touched }) => (
                    <Form>
                      <Container>
                        <Col>
                          <Field
                            name='name'
                            component={TextField}
                            label='Name'
                            title='Name'
                          />
                        </Col>
                        <Col className={styles.formField}>
                          <Field
                            name='nationality'
                            multiple={false}
                            component={Autocomplete}
                            options={COUNTRY_LIST}
                            getOptionLabel={(option) => option}
                            style={{ width: 300 }}
                            renderInput={(params) => (
                              <MuiTextField
                                {...params}
                                name='nationality'
                                error={
                                  touched['nationality'] &&
                                  !!errors['nationality']
                                }
                                helperText={
                                  touched['nationality'] &&
                                  errors['nationality']
                                }
                                label='Nationality'
                                variant='outlined'
                              />
                            )}
                          />
                        </Col>
                        <Col styles={{ marginBottom: '1em' }}>
                          <Button type='submit' variant='success'>
                            Submit
                          </Button>{' '}
                          {editableMember && (
                            <Button
                              onClick={() =>
                                setEditableMember(undefined)
                              }
                            >
                              {' '}
                              Reset
                            </Button>
                          )}
                        </Col>
                      </Container>
                    </Form>
                  )}
                </Formik>
              </Col>
            ]}
          ></FormTabs>
        </Col>
      </Row>
    </Container>
  )
}

export default Members
