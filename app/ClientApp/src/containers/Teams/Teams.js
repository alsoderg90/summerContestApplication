import { useEffect, useState } from 'react'
import {
  Container,
  Button,
  Col,
  Row,
  Table,
  Image
} from 'react-bootstrap'
import { Field, Form, Formik } from 'formik'
import { TextField, Select } from 'formik-mui'
import { MenuItem, FormControl } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteButton, EditButton } from 'components/Buttons/buttons'
import * as yup from 'yup'
import FormTabs from 'components/FormTabs/FormTabs'
import ErrorComponent from 'components/ErrorComponent/ErrorComponent'
import { getMembers } from 'redux/modules/members/actions'
import { selectMembers } from 'redux/modules/members/selectors'
import {
  getTeams,
  createTeam,
  deleteTeam,
  editTeam
} from 'redux/modules/teams/actions'
import {
  selectTeams,
  selectTeamsError
} from 'redux/modules/teams/selectors'
import { getUserPoints, getTeamPoints } from 'utils/functions'

const defaultTeam = {
  name: '',
  members: []
}

const member = yup.object({
  name: yup.string(),
  nationality: yup.string()
})

const createSchema = () => {
  return yup.object({
    name: yup.string().required(),
    members: yup
      .array()
      .of(member)
      .required()
      .min(1, 'Must have at least one member')
    //   .test(
    //     'is-added',
    //     'Member belongs another team',
    //     (members, context) => {
    //       console.log(members, context)
    //       return members.map((member) =>
    //         member.team
    //           ? this.createError({
    //               message: `Custom Message here ${value}`,
    //               path: 'fieldName' // Fieldname
    //             })
    //           : true
    //       )
    //     }
    //   )
  })
}

const Teams = () => {
  const dispatch = useDispatch()
  const schema = createSchema()
  const [activeKey, setActiveKey] = useState('Form')
  const [activeKeyTeam, setActiveKeyTeam] = useState(undefined)
  const [editableTeam, setEditableTeam] = useState(undefined)
  const members = useSelector((state) => selectMembers(state))
  const teams = useSelector((state) => selectTeams(state))
  const errors = useSelector((state) => selectTeamsError(state))

  useEffect(() => {
    if (!teams) dispatch(getTeams())
  }, [teams])

  useEffect(() => {
    if (!members) dispatch(getMembers())
  }, [members])

  const handleSubmit = (
    formData,
    { props, resetForm, setSubmitting }
  ) => {
    dispatch(createTeam(formData))
    setSubmitting(false)
    resetForm()
  }

  const handleDelete = (id) => {
    dispatch(deleteTeam(id))
  }

  const handleEdit = (formData, { resetForm, setSubmitting }) => {
    const id = editableTeam.id
    dispatch(editTeam(id, { ...formData, id }))
    setSubmitting(false)
  }

  const renderTeams = (teams) => {
    return teams?.map((team) => {
      return (
        <div key={team.id} name={team.name}>
          {/* <th colSpan={2}>{team.name.toUpperCase()} </th>
        <th colSpan={1}> {getTeamPoints(team.members)}</th>
        <th colSpan={1}>
          {' '}
        </th> */}
          <h5>{`Points: ${getTeamPoints(team.members)}`}</h5>
          <h5>Members:</h5>
          <Table striped bordered hover style={{ marginTop: '1em' }}>
            <thead>
              <tr></tr>
              <tr>
                <th>Name</th>
                <th>Nationality</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {team.members?.map((member, j) => (
                <tr key={j}>
                  <td>{member.name}</td>
                  <td>
                    <Image
                      alt={member.nationality}
                      width={100}
                      height={40}
                      src={member.flagUrl}
                    ></Image>
                  </td>
                  <td>{getUserPoints(member.points, member.id)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <DeleteButton
            onClick={() => handleDelete(team.id)}
          ></DeleteButton>{' '}
          <EditButton
            onClick={() => {
              setActiveKey('Form')
              setEditableTeam(team)
            }}
          ></EditButton>
        </div>
      )
    })
  }

  if (errors) {
    return <ErrorComponent {...errors}></ErrorComponent>
  }

  return (
    <Container>
      <FormTabs
        handleClick={(key) => setActiveKey(key)}
        activeKey={activeKey}
        tabs={[
          <div key='Form' name='Form'>
            <Formik
              initialValues={{
                name: editableTeam
                  ? editableTeam.name
                  : defaultTeam.name,
                members: []
              }}
              onSubmit={editableTeam ? handleEdit : handleSubmit}
              validationSchema={schema}
              enableReinitialize
            >
              {({ errors, touched, values, setFieldValue }) => (
                <Form>
                  <Container>
                    <Row>
                      <Col>
                        <FormControl fullWidth>
                          <Field
                            name='name'
                            component={TextField}
                            label='Name'
                            title='Name'
                          />{' '}
                        </FormControl>
                      </Col>
                    </Row>
                    <p></p>
                    <Row>
                      <Col style={{ marginBottom: '1em' }}>
                        <FormControl fullWidth>
                          <Field
                            name='members'
                            multiple
                            component={Select}
                            label='Members'
                            renderValue={(selected) =>
                              selected
                                .map((obj) => obj.name)
                                .join(', ')
                            }
                          >
                            {members?.map((m) => (
                              <MenuItem key={m.id} value={m}>
                                {m.name}{' '}
                              </MenuItem>
                            ))}
                          </Field>
                        </FormControl>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Button type='submit' variant='success'>
                          Submit
                        </Button>{' '}
                        {editableTeam && (
                          <Button
                            onClick={() => setEditableTeam(undefined)}
                          >
                            Reset
                          </Button>
                        )}
                      </Col>
                    </Row>
                  </Container>
                </Form>
              )}
            </Formik>
          </div>,
          <div key='teams' name='Teams'>
            <Col sm={8}>
              {teams && teams.length > 0 ? (
                <FormTabs
                  tabs={renderTeams(teams)}
                  activeKey={activeKeyTeam}
                  handleClick={(key) => setActiveKeyTeam(key)}
                ></FormTabs>
              ) : (
                <></>
              )}
            </Col>
          </div>
        ]}
      ></FormTabs>
    </Container>
  )
}

export default Teams
