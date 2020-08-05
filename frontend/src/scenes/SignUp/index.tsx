import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import { signUpValSchema as validationSchema } from '../../common/models/formik/ValSchema';
import styles from './styles.module.sass';
import { addNewUserRoutine } from './routines';
import InputField from '../../components/InputField/InputField';
import { Routine } from 'redux-saga-routines';
import { IUserInput } from '../../common/models/signIn-signUp/user';

interface IProps {
  addNewUser: Routine;
}

export const SignUp: FunctionComponent<IProps> = ({ addNewUser }) => {
  const onSubmit = async (values: IUserInput,
    { setSubmitting }: { setSubmitting: Function }) => {
    const { email, password, fullName } = values;
    const mappedValues = {
      email,
      password,
      fullName
    };
    const payload = {
      payload: mappedValues
    };
    addNewUser(payload);
    setSubmitting(false);
  };

  const initialValues = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  return (
    <div className={styles.signUp}>
      <h1 className="text-center p-5">Sign up</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="signUp-form d-flex flex-column justify-content-center align-items-center">
          <InputField
            label="Full Name:"
            name="fullName"
            type="text"
            placeholder="John Brown"
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

const mapDispatchToProps = {
  addNewUser: addNewUserRoutine
};

export default connect(
  null,
  mapDispatchToProps
)(SignUp);
