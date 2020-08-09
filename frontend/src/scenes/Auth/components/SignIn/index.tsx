import React, { FunctionComponent } from 'react';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import styles from './styles.module.sass';
import { signInValSchema as validationSchema } from '../../../../common/models/formik/ValidationSchemas';
import { ILoginUser } from '../../../../common/models/auth/ILoginUser';
import { Routes } from '../../../../common/enums/Routes';
import InputField from '../../../../components/InputField/InputField';

interface IProps {
  loginUser: (payload: ILoginUser) => void;
}

const SignIn: FunctionComponent<IProps> = ({ loginUser }) => {
  const onSubmit = async (
    values: ILoginUser,
    { setSubmitting }: { setSubmitting: CallableFunction }
  ) => {
    const { email, password } = values;
    const payload = {
      email,
      password
    };
    loginUser(payload);
    setSubmitting(false);
  };
  const initialValues = {
    email: '',
    password: ''
  };

  return (
    <div className={styles.signIn}>
      <h1 className={styles.header}>Welcome</h1>
      <p className={styles.signUp}>
        {'New here? '}
        <Link className={styles.authLink} to={Routes.SignUp}>Create an account</Link>
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="signIn-form d-flex flex-column justify-content-center align-items-center">
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="user@gmail.com"
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            link={Routes.ForgotPassword}
            linkDescription="Forgot password?"
            linkClassName={styles.forgotPasswordLink}
          />
          <div className={`${styles.formFooter} mt-4 w-100`}>
            <Button type="submit" variant="primary" className={styles.primaryBtn}>
              Sign In
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default SignIn;
