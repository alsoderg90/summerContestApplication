import { Container, FormGroup } from 'react-bootstrap'
import { DatePicker, Multiselect } from 'react-widgets'
import Form from 'react-formal'
import * as yup from 'yup'
import { useState, useEffect } from 'react'

import memberService from '../../api/members'

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

  useEffect(() => {
    const fetchData = async () => {
      const res = await memberService.getAll()
      const members = res.data
      setMembers(members)
    }
    fetchData().catch(console.error)
  }, [])

  const handleSubmit = (formData) => {
    alert(JSON.stringify(formData, null, 2))
  }

  return (
    <Container>
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
    </Container>
  )
}

export default Teams
