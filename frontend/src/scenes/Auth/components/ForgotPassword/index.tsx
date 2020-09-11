import React, { FunctionComponent } from 'react';
import { Formik, Form } from 'formik';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './styles.module.sass';
import InputField from 'components/InputField/InputField';
import { forgotPasswordSchema as validationSchema } from 'common/models/formik/ValidationSchemas';
import { IForgotPasswordInput } from 'common/models/auth/IForgotPasswordInput';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { Routes } from 'common/enums/Routes';

interface IProps {
  forgotPassword: IBindingCallback1<IForgotPasswordInput>;
}

const ForgotPassword: FunctionComponent<IProps> = ({ forgotPassword }) => {
  const onSubmit = (values: IForgotPasswordInput) => {
    const { email } = values;
    forgotPassword({ email });
  };
  const initialValues = {
    email: ''
  };

  return (
    <div className={styles.forgotPassword}>
      <h1 className={styles.header}>Recover your password</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="d-flex flex-column justify-content-center align-items-center">
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="Your email address"
          />
          <div className={`${styles.formFooter} w-100`}>
            <Button type="submit" className={`${styles.primaryBtn} authButton save`}>
              Recover
            </Button>
            <div className={styles.linkWrapper}>
              <span>{'Remembered? '}</span>
              <Link className={styles.signInLink} to={Routes.SignIn}>Sign in</Link>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default ForgotPassword;
