import React, { FunctionComponent } from 'react';
import { Formik, Form } from 'formik';
import styles from './styles.module.sass';
import InputField from '../../components/InputField/InputField';
import { forgotPasswordSchema as validationSchema } from '../../common/models/formik/ValidationSchemas';
import { forgotPasswordRoutine } from '../../routines/user';
import { connect } from 'react-redux';
import { Routine } from 'redux-saga-routines';
import { IForgotPasswordInput } from '../../common/models/auth/IForgotPasswordInput';

interface IProps {
  forgotPassword: Routine;
}

const ForgotPassword: FunctionComponent<IProps> = ({ forgotPassword }) => {
  const onSubmit = async (values: IForgotPasswordInput,
    { setSubmitting }: { setSubmitting: CallableFunction }) => {
    const { email } = values;
    forgotPassword({ email });
    setSubmitting(false);
  };
  const initialValues = {
    email: ''
  };

  return (
    <div className={styles.forgotPassword}>
      <h1 className="text-center p-5">Recover your password</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="d-flex flex-column justify-content-center align-items-center">
          <InputField
            label="Email:"
            name="email"
            type="email"
            placeholder="Your email address"
          />

          <div className="form-group">
            <button type="submit" className="btn btn-primary mr-2">
              Recover
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

const mapDispatchToProps = {
  forgotPassword: forgotPasswordRoutine
};

export default connect(
  null,
  mapDispatchToProps
)(ForgotPassword);
