import React, { FunctionComponent } from 'react';
import styles from './styles.module.sass';
import InputField from 'components/InputField/InputField';
import { connect } from 'react-redux';
import { addWorkspaceRoutine } from 'scenes/Workspace/routines';
import { ReactComponent as Mascot } from 'img/chatitoMascot.svg';
import { ReactComponent as Logo } from 'img/logo.svg';
import { Formik, Form } from 'formik';
import { Button } from 'react-bootstrap';
import { createWorkspaceValSchema as validationSchema } from 'common/models/formik/ValidationSchemas';
import { Link } from 'react-router-dom';
import { IAppState } from 'common/models/store';

type IFetchWorkspace<T, S> = (name: T) => S;

interface IProps {
  addWorkspace: IFetchWorkspace<string, void>;
  activeWorkspace: string;
}
const AddWorkspace: FunctionComponent<IProps> = ({ addWorkspace, activeWorkspace }) => {
  const onSubmit = (values: IInitialValues): void => {
    addWorkspace(values.workspaceName);
  };
  const initialValues = {
    workspaceName: ''
  };
  interface IInitialValues {
    workspaceName: string;
  }
  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <div className={styles.createWorkspace}>
          <header className={styles.signInHeader}>
            <h1 className={styles.header}>Create a new workspace</h1>
          </header>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            <Form
              className={`${styles.inpBlock} signIn-form d-flex flex-column justify-content-center align-items-center`}
            >
              <InputField
                label="Workspace name"
                name="workspaceName"
                type="workspaceName"
                placeholder="workspace"
              />
              <div className={`${styles.formFooter} w-100`}>
                { activeWorkspace ? (
                  <Link className={styles.backButtonWrapper} to={`/w/${activeWorkspace}`}>
                    <Button variant="primary" className={`${styles.primaryBtnBack} authButton back`}>
                      Back
                    </Button>
                  </Link>
                ) : null}
                <Button type="submit" variant="primary" className={`${styles.primaryBtn} authButton save`}>
                  Next
                </Button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
      <div className={styles.rightSide}>
        <Mascot className={styles.mascot} />
        <Logo className={styles.logo} />
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  activeWorkspace: state.workspace.workspace.hash
});

const mapDispatchToProps = {
  addWorkspace: addWorkspaceRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(AddWorkspace);
