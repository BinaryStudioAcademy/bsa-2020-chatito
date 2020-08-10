import React, { FunctionComponent, useEffect } from 'react';
import { Formik, Form } from 'formik';
import styles from './styles.module.sass';
import InputField from '../../../../components/InputField/InputField';
import { resetPasswordSchema as validationSchema } from '../../../../common/models/formik/ValidationSchemas';
import { resetPasswordRoutine } from '../../../../routines/user';
import { connect } from 'react-redux';
import { Routine } from 'redux-saga-routines';
import { IResetPasswordInput } from '../../../../common/models/auth/IResetPasswordInput';
import { Button } from 'react-bootstrap';

interface IProps {
  resetPassword: Routine;
  match: {
    params: {
      token: string;
    };
  };
}

const ForgotPassword: FunctionComponent<IProps> = ({ resetPassword, match }) => {
  const onSubmit = async (
    values: IResetPasswordInput,
    { setSubmitting }: { setSubmitting: CallableFunction }
  ) => {
    const { token } = match.params;
    resetPassword({ token, ...values });
    setSubmitting(false);
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
        <Form className="d-flex flex-column justify-content-center align-items-center">
          <InputField label="Password:" name="password" type="password" />
          <InputField
            label="Confirm Password:"
            name="confirmPassword"
            type="password"
          />

          <div className={`${styles.formFooter} mt-4 w-100`}>
            <Button type="submit" className={styles.primaryBtn}>
              Reset password
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

const mapDispatchToProps = {
  resetPassword: resetPasswordRoutine
};

export default connect(null, mapDispatchToProps)(ForgotPassword);
