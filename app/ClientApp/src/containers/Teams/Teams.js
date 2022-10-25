import { useState, useEffect } from 'react'
import {
  Container,
  Button,
  Col,
  Row,
  FormGroup,
  Table,
  Image
} from 'react-bootstrap'
import { DatePicker, Multiselect } from 'react-widgets'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteButton } from '../../components/Buttons/buttons'
import Form from 'react-formal'
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
    year: yup.date().required().default(new Date()),
    members: yup.array().required()
  })
}

const Teams = () => {
  const dispatch = useDispatch()
  const schema = createSchema()
  const [form, setForm] = useState()

  const members = useSelector((state) => selectMembers(state))
  const teams = useSelector((state) => selectTeams(state))

  useEffect(() => {
    if (!teams) dispatch(getTeams())
  }, [teams])

  useEffect(() => {
    if (!members) dispatch(getMembers())
  }, [members])

  const handleSubmit = (formData) => {
    dispatch(createTeam(formData))
  }

  const handleDelete = (id) => {
    dispatch(deleteTeam(id))
  }

  const renderTeamTables = (teams) => {
    return teams?.map((team, i) => (
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
          <Form
            value={form}
            schema={schema}
            onChange={setForm}
            onSubmit={handleSubmit}
            defaultValue={schema.default()}
          >
            <>
              Add Team
              <FormGroup className='mb-3' controlId='formBasicEmail'>
                <label style={{ display: 'block' }}>Name:</label>
                <Form.Field className='form-label' name='name' />
              </FormGroup>
              <FormGroup className='mb-3' controlId='formBasicPassword'>
                <label>
                  Year:
                  <Form.Field
                    name='year'
                    as={DatePicker}
                    valueFormat={{ year: 'numeric' }}
                    calendarProps={{ views: ['decade'] }}
                  />
                </label>
              </FormGroup>
              Members
              <FormGroup className='mb-3' controlId='formBasicPassword'>
                <label>
                  <Form.Field
                    name='members'
                    as={Multiselect}
                    data={members}
                    dataKey='id'
                    textField='name'
                  />
                </label>
              </FormGroup>
              {Object.keys(schema?.fields).map((field, index) => {
                return (
                  <div key={index}>
                    <Form.Message for={[field]} className='error' />
                  </div>
                )
              })}
              <Button style={{ marginBottom: '2em' }} type='submit'>
                Submit
              </Button>
            </>
          </Form>
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
