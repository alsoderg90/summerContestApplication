import { Container, Row, FormGroup, Table, Image } from 'react-bootstrap'
import { DatePicker, Multiselect } from 'react-widgets'
import Form from 'react-formal'
import * as yup from 'yup'
import { useState, useEffect } from 'react'

import memberService from '../../api/members'
import teamService from '../../api/teams'
import { getUserPoints } from '../../utils/functions'

const createSchema = () => {
  return yup.object({
    name: yup.string().required(),
    year: yup.date().required().default(new Date()),
    members: yup.array().required()
  })
}

const Teams = () => {
  const schema = createSchema()
  const [form, setForm] = useState()

  const [members, setMembers] = useState()
  const [teams, setTeams] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const members = await memberService.getAll()
      setMembers(members)
    }
    fetchData().catch(console.error)
  }, [])

  console.log(teams)

  useEffect(() => {
    const fetchData = async () => {
      const teams = await teamService.getAll()
      setTeams(teams)
    }
    fetchData().catch(console.error)
  }, [])

  const handleSubmit = async (formData) => {
    const team = await teamService.create(formData)
    setForm({})
    setTeams(teams.concat(teams))
  }

  return (
    <Container>
      <Row>
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
            <Form.Submit>Submit</Form.Submit>
          </>
        </Form>
      </Row>
      {teams?.map((team, i) => (
        <Row key={i}>
          <Table striped bordered hover style={{ marginTop: '2em' }}>
            <thead>
              <tr>
                <th colSpan={3}>{team.name}</th>
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
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
      ))}
    </Container>
  )
}

export default Teams
