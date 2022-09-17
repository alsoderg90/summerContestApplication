import { FormGroup } from 'react-bootstrap'
import { DatePicker, Multiselect } from 'react-widgets'
import Form from 'react-formal'
import * as yup from 'yup'
import { useState } from 'react'

const createSchema = () => {
  return yup.object({
    name: yup.string().required(),
    year: yup.date().required(),
    members: yup.array()
  })
}

const TeamForm = () => {
  const schema = createSchema()
  const [form, setForm] = useState()

  const handleSubmit = (formData) => {
    alert(JSON.stringify(formData, null, 2))
  }

  return (
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
          <label>
            Name:
            <Form.Field name='name' />
          </label>
        </FormGroup>
        <FormGroup className='mb-3' controlId='formBasicPassword'>
          <label>
            Year:
            <Form.Field
              name='year'
              as={DatePicker}
              valueFormat={{ year: 'numeric' }}
              defaultValue={new Date()}
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
              defaultValue={['Yellow']}
              data={['Red', 'Yellow', 'Blue', 'Orange']}
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
  )
}

export default TeamForm
