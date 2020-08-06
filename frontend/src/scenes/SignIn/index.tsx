import React, { FunctionComponent } from 'react';
import { Formik, Form } from 'formik';
import styles from './styles.module.sass';
import InputField from '../../components/InputField/InputField';
import { signInValSchema as validationSchema } from '../../common/models/formik/ValidationSchemas';
import { IUserInput } from '../../common/models/auth/IUserInput';
import { fetchUserRoutine } from '../../routines/user';
import { connect } from 'react-redux';
import { Routine } from 'redux-saga-routines';

interface IProps {
  fetchUser: Routine;
}

const SignIn: FunctionComponent<IProps> = ({ fetchUser }) => {
  const onSubmit = async (values: IUserInput,
    { setSubmitting }: { setSubmitting: CallableFunction }) => {
    const { email, password } = values;
    const payload = {
      payload: { email, password }
    };
    fetchUser(payload);
    setSubmitting(false);
  };
  const initialValues = {
    email: '',
    password: ''
  };

  return (
    <div className={styles.signIn}>
      <h1 className="text-center p-5">Sign in</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
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

const mapDispatchToProps = {
  fetchUser: fetchUserRoutine
};

export default connect(
  null,
  mapDispatchToProps
)(SignIn);
