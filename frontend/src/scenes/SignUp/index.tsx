import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import { signUpValSchema as validationSchema } from '../../common/models/formik/ValidationSchemas';
import styles from './styles.module.sass';
import { addNewUserRoutine } from '../../routines/user';
import InputField from '../../components/InputField/InputField';
import { Routine } from 'redux-saga-routines';
import { IRegisterUser } from '../../common/models/auth/IRegisterUser';
import { Button } from 'react-bootstrap';
import { push } from 'connected-react-router';
import { Routes } from '../../common/enums/Routes';

interface IProps {
  addNewUser: Routine;
  router: (route: string) => void;
}

export const SignUp: FunctionComponent<IProps> = ({ addNewUser, router }) => {
  const onSubmit = async (values: IRegisterUser,
    { setSubmitting }: { setSubmitting: CallableFunction }) => {
    const { email, password, fullName } = values;
    const user = { email, password, fullName };
    addNewUser(user);
    setSubmitting(false);
  };

  const initialValues = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  const onAlreadySignIn = () => {
    router(Routes.SignIn);
  };

  return (
    <div className={styles.signUp}>
      <h1 className={`text-center ${styles['signUp-header']}`}>Sign up</h1>
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
            <Button type="submit" variant="primary">
              Sign Up
            </Button>
            <Button variant="link" onClick={onAlreadySignIn}>
              Already Signed up?
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

const mapDispatchToProps = {
  addNewUser: addNewUserRoutine,
  router: push
};

export default connect(
  null,
  mapDispatchToProps
)(SignUp);
