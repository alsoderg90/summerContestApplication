import { useState, useEffect } from 'react'
import {
  Container,
  Row,
  Image,
  FormGroup,
  Button,
  Table
} from 'react-bootstrap'
import { DropdownList } from 'react-widgets'
import Form from 'react-formal'
import * as yup from 'yup'
import { countryList } from './constants'
import restCountriesService from '../../api/restcountries'
import memberService from '../../api/members'
import locationMembers from '../../api/locationMembers'

const createSchema = () => {
  return yup.object({
    name: yup.string().required(),
    nationality: yup.string().required()
  })
}

const Members = () => {
  const schema = createSchema()
  const [form, setForm] = useState()
  const [members, setMembers] = useState()
  const [points, setPoints] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const res = await memberService.getAll()
      const members = res.data
      setMembers(members)
    }
    fetchData().catch(console.error)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const res = await locationMembers.getAll()
      const points = res.data
      setPoints(points)
    }
    fetchData().catch(console.error)
  }, [])

  console.log(points)

  const handleSubmit = async (formData) => {
    try {
      const res = await restCountriesService.get(formData)
      const { svg } = res.data[0].flags
      const newForm = { ...formData, flagUrl: svg }
      setForm(newForm)
      memberService.create(newForm)
    } catch (e) {
      const newForm = { ...formData, flag: '' }
      setForm(newForm)
      memberService.create(newForm)
      console.warn(e)
    }
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
            Add Member
            <FormGroup className='mb-3' controlId='formBasicEmail'>
              <label style={{ display: 'block' }}>Name:</label>
              <Form.Field className='form-label' name='name' />
            </FormGroup>
            <FormGroup className='mb-3' controlId='formBasicEmail'>
              <label style={{ display: 'block' }}>Nationality:</label>
              <Form.Field
                as={DropdownList}
                data={countryList}
                name='nationality'
                renderListItem={({ item }) =>
                  item.charAt(0).toUpperCase() + item.slice(1)
                }
              />
            </FormGroup>
            <div style={{ paddingBottom: '1em' }}>
              {Object.keys(schema?.fields).map((field, index) => {
                return (
                  <div key={index}>
                    <Form.Message for={[field]} className='form-errors' />
                  </div>
                )
              })}
            </div>
            <Button type='submit'>Submit</Button>
          </>
        </Form>
      </Row>
      <Row>
        <Table striped bordered hover style={{ marginTop: '2em' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Nationality</th>
              <th>Points</th>
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
                <td>0</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  )
}

export default Members
