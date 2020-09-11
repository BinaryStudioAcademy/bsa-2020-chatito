import React, { FunctionComponent } from 'react';
import { Formik, Form } from 'formik';
import { Button } from 'react-bootstrap';
import styles from './styles.module.sass';
import InputField from 'components/InputField/InputField';
import { resetPasswordSchema as validationSchema } from 'common/models/formik/ValidationSchemas';
import { IResetPasswordInput } from 'common/models/auth/IResetPasswordInput';
import { IResetPasswordCallback } from 'common/models/auth/IResetPasswordCallback';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';

interface IProps {
  resetPassword: IBindingCallback1<IResetPasswordCallback>;
  match: {
    params: {
      token: string;
    };
  };
}

const ForgotPassword: FunctionComponent<IProps> = ({ resetPassword, match }) => {
  const onSubmit = (values: IResetPasswordInput) => {
    const { token } = match.params;
    resetPassword({ token, ...values });
  };
  const initialValues = {
    password: '',
    confirmPassword: ''
  };

  return (
    <div className={styles.resetPassword}>
      <h1 className={styles.header}>Reset Password</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className={`${styles.inputForms} d-flex flex-column justify-content-center align-items-center`}>
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
          <div className={`${styles.formFooter} w-100`}>
            <Button type="submit" className={`${styles.primaryBtn} authButton save`}>
              Reset password
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default ForgotPassword;
