import { useState, useEffect } from 'react'
import { Container, Col, Row, Image, Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import { Field, Form, Formik } from 'formik'
import { TextField, Autocomplete } from 'formik-mui'
import MuiTextField from '@mui/material/TextField'
import { COUNTRY_LIST } from './constants'
import Charts from '../../components/Charts/Charts'
import FormTabs from '../../components/FormTabs/FormTabs'
import restCountriesService from '../../api/restcountries'
import {
  getMembers,
  createMember,
  deleteMember
} from '../../redux/modules/members/actions'
import { getPoints } from '../../redux/modules/points/actions'
import { getUserPoints } from '../../utils/functions'
import { selectMembers } from '../../redux/modules/members/selectors'
import { selectPoints } from '../../redux/modules/points/selectors'
import { DeleteButton } from '../../components/Buttons/buttons'

const createSchema = () => {
  return yup.object({
    name: yup.string().required('Name is a required field'),
    nationality: yup
      .string()
      .typeError('Nationality is required field')
      .required('Nationality is required field')
  })
}

const Members = () => {
  const dispatch = useDispatch()
  const members = useSelector((state) => selectMembers(state))
  const points = useSelector((state) => selectPoints(state))

  const schema = createSchema()

  useEffect(() => {
    if (!members) dispatch(getMembers())
  }, [members])

  useEffect(() => {
    if (!points) dispatch(getPoints())
  }, [points])

  const handleSubmit = async (
    formData,
    { props, resetForm, setSubmitting }
  ) => {
    try {
      const res = await restCountriesService.get(formData)
      const { svg } = res.data[0].flags
      const newMember = { ...formData, flagUrl: svg }
      dispatch(createMember(newMember))
    } catch (e) {
      const newMember = { ...formData, flag: '' }
      dispatch(createMember(newMember))
    }
    setSubmitting(false)
    resetForm()
  }

  const handleDelete = (id) => {
    dispatch(deleteMember(id))
  }
  return (
    <Container>
      <Row>
        <Col sm={4}>
          <Formik
            initialValues={{ name: '', nationality: '' }}
            onSubmit={handleSubmit}
            validationSchema={schema}
          >
            {({ errors, touched }) => (
              <Form>
                <Container>
                  <Col>
                    <Field
                      name='name'
                      component={TextField}
                      label='Name'
                      title='Name'
                    />
                    <Field
                      name='nationality'
                      multiple={false}
                      component={Autocomplete}
                      options={COUNTRY_LIST}
                      getOptionLabel={(option) => option}
                      style={{ width: 300 }}
                      renderInput={(params) => (
                        <MuiTextField
                          {...params}
                          name='nationality'
                          error={
                            touched['nationality'] && !!errors['nationality']
                          }
                          helperText={
                            touched['nationality'] && errors['nationality']
                          }
                          label='Nationality'
                          variant='outlined'
                        />
                      )}
                    />
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
          <FormTabs
            tabs={[
              <Table key='Members' name='Members' striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Nationality</th>
                    <th>Points</th>
                    <th>Actions</th>
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
                      <td>{getUserPoints(member.points, member.id)}</td>
                      <td>
                        <DeleteButton
                          onClick={() => handleDelete(member.id)}
                        ></DeleteButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>,
              <Charts key='Charts' name='Charts' data={members}></Charts>
            ]}
          ></FormTabs>
        </Col>
      </Row>
    </Container>
  )
}

export default Members