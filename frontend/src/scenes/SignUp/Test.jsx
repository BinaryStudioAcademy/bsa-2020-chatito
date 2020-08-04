import React from 'react';
import { connect, mapDispatchToProps } from 'redux';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import './SignUp.sass';
import { registration } from '../../services/authService';
import { setLocalStorageItem } from '../../helpers/localStorageHelper';

const InputField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="inputField form-group d-flex flex-column">
      <span>{label}</span>
      <input className={`text-input ${meta.touched && meta.error ? 'invalid-input' : ''}`} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export const SignupForm = props => {
  const a = 5;
  return (
    <div className="signUp">
      <h1 className="text-center p-5">Sign up</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: ''
        }}
        validationSchema={Yup.object().shape({
          firstName: Yup.string()
            .required('First Name is required')
            .max(40, 'First name should be no longer 40 characters'),
          lastName: Yup.string()
            .required('Last Name is required')
            .max(40, 'Last name should be no longer 40 characters'),
          email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
          password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), ''], 'Passwords must match')
            .required('Confirm Password is required')
        })}
        onSubmit={async (values, { setSubmitting }) => {
          const { userData, token } = await registration(JSON.stringify(values));
          props.addNewUserAction(userData);
          setLocalStorageItem('token', token);
          setSubmitting(false);
        }}
      >
        <Form className="signUp-form d-flex flex-column justify-content-center align-items-center">
          <InputField
            label="First Name:"
            name="firstName"
            type="text"
            placeholder="John"
          />
          <InputField
            label="Last Name:"
            name="lastName"
            type="text"
            placeholder="Brown"
          />
          <InputField
            label="Email:"
            name="email"
            type="email"
            placeholder="example@gmail.com"
          />
          <InputField
            label="Password:"
            name="password"
            type="password"
          />
          <InputField
            label="Confirm Password:"
            name="confirmPassword"
            type="password"
          />

          <div className="form-group">
            <button type="submit" className="btn btn-primary mr-2">
              Sign Up
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(
      addNewUserAction,
      dispatch
    )
});

export default connect(
  null,
  mapDispatchToProps
)(SignUp)
