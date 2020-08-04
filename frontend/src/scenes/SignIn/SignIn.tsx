import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import './SignUp.sass';
import { login } from '../../services/authService';
import { setLocalStorageItem } from '../../helpers/localStorageHelper';

const InputField = ({ label, ...props }: { label: string, name: string, type: string, placeholder?: string }) => {
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

export const SignUp = (props: any) => {
  return (
    <div className="signUp">
      <h1 className="text-center p-5">Sign in</h1>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
          password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required')
        })}
        onSubmit={async (values:
          { email: string, password: string },
          { setSubmitting }) => {
          const { userData, token } = await login(JSON.stringify(values));
          setLocalStorageItem('token', token);
          setSubmitting(false);
        }}
      >
        <Form className="signUp-form d-flex flex-column justify-content-center align-items-center">
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

          <div className="form-group">
            <button type="submit" className="btn btn-primary mr-2">
              Sign In
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
