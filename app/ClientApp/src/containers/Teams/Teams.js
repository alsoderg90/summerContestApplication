import { useEffect } from 'react'
import { Container, Button, Col, Row, Table, Image } from 'react-bootstrap'
import { Field, Form, Formik } from 'formik'
import { TextField, Select } from 'formik-mui'
import { MenuItem } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteButton } from '../../components/Buttons/buttons'
import * as yup from 'yup'
import FormTabs from '../../components/FormTabs/FormTabs'
import { getMembers } from '../../redux/modules/members/actions'
import { selectMembers } from '../../redux/modules/members/selectors'
import {
  getTeams,
  createTeam,
  deleteTeam
} from '../../redux/modules/teams/actions'
import { selectTeams } from '../../redux/modules/teams/selectors'
import { getUserPoints, getTeamPoints } from '../../utils/functions'

const createSchema = () => {
  return yup.object({
    name: yup.string().required(),
    members: yup.array().required().min(1, 'Must have at least one member')
  })
}

const Teams = () => {
  const dispatch = useDispatch()
  const schema = createSchema()

  const members = useSelector((state) => selectMembers(state))
  const teams = useSelector((state) => selectTeams(state))

  useEffect(() => {
    if (!teams) dispatch(getTeams())
  }, [teams])

  useEffect(() => {
    if (!members) dispatch(getMembers())
  }, [members])

  const handleSubmit = (formData, { props, resetForm, setSubmitting }) => {
    //dispatch(createTeam(formData))
    console.log(formData)
    setSubmitting(false)
    resetForm()
  }

  const handleDelete = (id) => {
    dispatch(deleteTeam(id))
  }

  const renderTeamTables = (teams) => {
    return teams?.map((team) => (
      <Table
        key={team.id}
        name={team.name}
        striped
        bordered
        hover
        style={{ marginTop: '2em' }}
      >
        <thead>
          <tr>
            <th colSpan={2}>{team.name.toUpperCase()} </th>
            <th colSpan={1}> {getTeamPoints(team.members)}</th>
            <th colSpan={1}>
              {' '}
              <DeleteButton
                onClick={() => handleDelete(team.id)}
              ></DeleteButton>
            </th>
          </tr>
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
              <td></td>
            </tr>
          ))}
        </tbody>
      </Table>
    ))
  }

  return (
    <Container>
      <Row>
        <Col sm={4}>
          <Formik
            initialValues={{ name: '', members: [] }}
            onSubmit={handleSubmit}
            validationSchema={schema}
          >
            {({ errors, touched, setFieldValue }) => (
              <Form>
                <Container>
                  <Col>
                    <Field
                      name='name'
                      component={TextField}
                      label='Name'
                      title='Name'
                    />{' '}
                    <Field
                      name='members'
                      multiple
                      component={Select}
                      label='Name'
                    >
                      {members?.map((m) => (
                        <MenuItem key={m.id} value={m}>
                          {m.name}{' '}
                        </MenuItem>
                      ))}
                    </Field>
                  </Col>
                </Container>
                <Button type='submit' color='primary'>
                  Submit
                </Button>{' '}
              </Form>
            )}
          </Formik>
        </Col>
        <Col sm={8}>
          {teams && teams.length > 0 ? (
            <FormTabs tabs={renderTeamTables(teams)}></FormTabs>
          ) : (
            <></>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default Teams
