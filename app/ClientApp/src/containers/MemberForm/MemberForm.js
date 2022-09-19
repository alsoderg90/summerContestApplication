import { FormGroup } from 'react-bootstrap'
import { DropdownList } from 'react-widgets'
import Form from 'react-formal'
import * as yup from 'yup'
import { useState } from 'react'
import { countryList } from './constants'
import restCountriesService from '../../api/restcountries'
import memberService from '../../api/members'

const createSchema = () => {
  return yup.object({
    name: yup.string().required(),
    nationality: yup.string().required()
  })
}

const MemberForm = () => {
  const schema = createSchema()
  const [form, setForm] = useState()

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
