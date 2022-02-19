import { Formik } from 'formik';
import * as yup from 'yup';
import {
  Form,
  Button,
  FormControl,
  FormGroup,
  FormSelect,
} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Options from './Options';
import { ford, vw, audi } from '../../setup';

const schema = yup.object().shape({
  fullName: yup
    .string()
    .min(2, 'Name is too short')
    .max(20, 'Name is too long')
    .required('A name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup
    .string()
    .matches(/^\d+$/, 'Only numbers are allowed')
    .min(11, 'Phone number must have 11 digits')
    .max(11, 'Phone number must have 11 digits')
    .required('Phone Number is required'),
  startDate: yup
    .date()
    .default(() => new Date().toLocaleDateString('en-us'))
    .min(new Date(), 'Cannot pick a past date'),
  endDate: yup
    .date()
    .default(() => new Date().toLocaleDateString('en-us'))
    .min(new Date(), 'Please pick a future date'),
});

export default function RentalForm({ setData, data, setRedirect }) {
  const [carModel, setCarModel] = useState({});

  const handleCarChange = (e) => {
    if (e === 'ford') {
      setCarModel(ford);
    } else if (e === 'vw') {
      setCarModel(vw);
    } else if (e === 'audi') {
      setCarModel(audi);
    }
  };

  return (
    <div className='container'>
      <h1>pro rent</h1>
      <Formik
        initialValues={{
          fullName: '',
          email: '',
          phone: '',
          startDate: '',
          endDate: '',
          model: '',
        }}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          try {
            setData({ ...data, values });
            setRedirect(true);
            actions.setSubmitting(false);
            actions.resetForm({
              values: {
                fullName: '',
                email: '',
                phone: '',
                startDate: '',
                endDate: '',
                model: '',
              },
            });
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {(props) => (
          <div className='form-container'>
            <Form noValidate className='reg-form' onSubmit={props.handleSubmit}>
              <FormGroup>
                <FormControl
                  className='field name'
                  type='text'
                  name='fullName'
                  placeholder='Full Name'
                  onBlur={props.handleBlur}
                  onChange={props.handleChange}
                  value={props.values.fullName}
                  isValid={props.touched.fullName && !props.errors.fullName}
                  isInvalid={!!props.errors.fullName}
                />
                <FormControl.Feedback type='invalid'>
                  {props.errors.fullName}
                </FormControl.Feedback>
              </FormGroup>
              <FormGroup>
                <FormControl
                  className='field email'
                  type='text'
                  name='email'
                  placeholder='Email'
                  onBlur={props.handleBlur}
                  onChange={props.handleChange}
                  value={props.values.email}
                  isValid={props.touched.email && !props.errors.email}
                  isInvalid={!!props.errors.email}
                />
                <FormControl.Feedback type='invalid'>
                  {props.errors.email}
                </FormControl.Feedback>
              </FormGroup>
              <FormGroup>
                <FormControl
                  className='field phone'
                  type='text'
                  name='phone'
                  placeholder='Phone Number'
                  onBlur={props.handleBlur}
                  onChange={props.handleChange}
                  value={props.values.phone}
                  isValid={props.touched.phone && !props.errors.phone}
                  isInvalid={!!props.errors.phone}
                />
                <FormControl.Feedback type='invalid'>
                  {props.errors.phone}
                </FormControl.Feedback>
              </FormGroup>
              <FormGroup>
                <FormControl
                  className='field start'
                  type='date'
                  name='startDate'
                  placeholder='Start Date'
                  onBlur={props.handleBlur}
                  onChange={props.handleChange}
                  value={props.values.startDate}
                  isValid={props.touched.startDate && !props.errors.startDate}
                  isInvalid={!!props.errors.startDate}
                />
                <FormControl.Feedback type='invalid'>
                  {props.errors.startDate}
                </FormControl.Feedback>
                <FormControl
                  className='field end'
                  type='date'
                  name='endDate'
                  placeholder='End Date'
                  onBlur={props.handleBlur}
                  onChange={props.handleChange}
                  value={props.values.endDate}
                  isValid={props.touched.endDate && !props.errors.endDate}
                  isInvalid={!!props.errors.endDate}
                />
                <FormControl.Feedback type='invalid'>
                  {props.errors.endDate}
                </FormControl.Feedback>
              </FormGroup>
              <FormSelect
                aria-label='Select your car model'
                className='field model'
                name='model'
                onBlur={props.handleBlur}
                onChange={(e) => {
                  props.handleChange(e);
                  handleCarChange(e.target.value);
                }}
                value={props.values.model}
                isValid={props.touched.model && !props.errors.model}
                isInvalid={!!props.errors.model}
              >
                <option>Select your choice</option>
                <option value='ford'>Ford Fiesta</option>
                <option value='vw'>VW Golf</option>
                <option value='audi'>Audi Q3</option>
              </FormSelect>
              <Button className='btn' variant='primary' type='submit'>
                submit your order
              </Button>
            </Form>
          </div>
        )}
      </Formik>
      <Options model={carModel} />
    </div>
  );
}
