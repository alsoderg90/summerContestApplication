import { FormGroup } from 'react-bootstrap'
import { Multiselect } from 'react-widgets'
import Form from 'react-formal'
import * as yup from 'yup'
import { useState } from 'react'

const createSchema = () => {
  return yup.object({
    name: yup.string().required()
  })
}

const MemberForm = () => {
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
        Add Member
        <FormGroup className='mb-3' controlId='formBasicEmail'>
          <label>
            Name:
            <Form.Field name='name' />
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

export default MemberForm
