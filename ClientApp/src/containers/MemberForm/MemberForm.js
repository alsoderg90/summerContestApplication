import { FormGroup } from 'react-bootstrap'
import { Combobox, Multiselect } from 'react-widgets'
import Form from 'react-formal'
import * as yup from 'yup'
import { useState } from 'react'
import axios from 'axios'
import { countryList } from './constants'

const createSchema = () => {
  return yup.object({
    name: yup.string().required(),
    nationality: yup.string().required()
  })
}

const MemberForm = () => {
  const schema = createSchema()
  const [form, setForm] = useState()

  const handleSubmit = (formData) => {
    axios
      .get(`https://restcountries.com/v3.1/name/${formData.nationality}`)
      .then((res) => {
        const { svg } = res.data[0].flags
        const newForm = { ...formData, flag: svg }
        setForm(newForm)
        alert(JSON.stringify(newForm, null, 2))
      })
      .catch((e) => {
        const newForm = { ...formData, flag: '' }
        setForm(newForm)
        alert(JSON.stringify(newForm, null, 2))
      })
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
          <label style={{ display: 'block' }}>Name:</label>
          <Form.Field className='form-label' name='name' />
        </FormGroup>
        <FormGroup className='mb-3' controlId='formBasicEmail'>
          <label style={{ display: 'block' }}>Nationality:</label>
          <Form.Field
            as={Combobox}
            data={countryList}
            name='nationality'
            renderListItem={({ item }) =>
              item.charAt(0).toUpperCase() + item.slice(1)
            }
          />
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
