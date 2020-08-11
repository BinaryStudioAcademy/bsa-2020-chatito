import React, { FunctionComponent } from 'react';
import { Formik, Form } from 'formik';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './styles.module.sass';
import { signUpValSchema as validationSchema } from 'common/models/formik/ValidationSchemas';
import { IRegisterUser } from 'common/models/auth/IRegisterUser';
import { Routes } from 'common/enums/Routes';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import InputField from 'components/InputField/InputField';
import { IWorkspace } from 'common/models/workspace/IWorkspace';

interface IProps {
  addNewUser: IBindingCallback1<IRegisterUser>;
  workspace: IWorkspace;
}

export const SignUp: FunctionComponent<IProps> = ({ addNewUser, workspace }) => {
  const onSubmit = (values: IRegisterUser) => {
    const { email, password, fullName } = values;
    const user = { email, password, fullName, workspace };
    addNewUser(user);
  };

  const initialValues = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    workspace
  };
  return (
    <div className={styles.signUp}>
      <h1 className={styles.header}>Sign up</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="signUp-form d-flex flex-column justify-content-center align-items-center">
          <InputField
            label="Full Name"
            name="fullName"
            type="text"
            placeholder="John Brown"
          />
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="example@gmail.com"
          />
          <InputField
            label="Password"
            name="password"
            type="password"
          />
          <InputField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
          />

          <div className={`${styles.formFooter} mt-4 w-100`}>
            <Button className={styles.primaryBtn} type="submit" variant="primary">
              Sign Up
            </Button>
            <Link className={styles.signInLink} to={Routes.SignIn}>
              Already Signed up?
            </Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default SignUp;
