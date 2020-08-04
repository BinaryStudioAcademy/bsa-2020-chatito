import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import './SignIn.sass';
import { login } from '../../services/authService';
import { setLocalStorageItem } from '../../common/helpers/localStorageHelper';
import InputField from '../../components/InputField/InputField';

export const SignIn = (props: any) => {
  return (
    <div className="signIn">
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
          const { token } = await login(JSON.stringify(values));
          setLocalStorageItem('token', token);
          setSubmitting(false);
        }}
      >
        <Form className="signIn-form d-flex flex-column justify-content-center align-items-center">
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
