import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import styles from './WorkspacePage.module.sass';
import logo from '../../img/ChatitoTemp.png';
import bgImg from '../../img/bg-img.png';
import { connect, useDispatch, Provider } from 'react-redux';
// import addWorkspace from '';

const WorkspacePage = () => {
  const dispatch = useDispatch();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(e.currentTarget.value);
  };
  const onSubmit = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
  };

  const [name, setState] = useState('');
  return (
    <div className={styles.workspacePage}>
      <div className={styles.workspacePage__container}>
        <Form className={styles.inputWorkspace}>
          <div className={styles.logoContainer}>
            <img className={styles.logoContainer__item} src={logo} alt="logo" />
          </div>
          <Form.Group className={styles.inputContainer}>
            <p className={styles.inputContainer__header}>Create a new workspace</p>
            <Form.Label className={styles.inputContainer__label}>Your workspace name</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              placeholder="workspace name"
              className={styles.inputContainer__input}
              onChange={onChange}
            />
          </Form.Group>
          <Button
            className={styles.inputButton}
            variant="secondary"
          >
            Next
          </Button>
        </Form>
        <div className={styles.infoSide}>
          <div className={styles.infoSide__topContainer}>
            <span>Looking to join an existing workspace?</span>
            <Button className={styles.infoButton} variant="light">Find your workspace</Button>
          </div>
          <div className={styles.infoSide__imageContainer}>
            <img src={bgImg} alt="background" />
          </div>
        </div>
      </div>
    </div>
  );
};

function mapDispatchToProps() {
  return {
    // onAdd: (name: string) => dispatch(addWorkspace(name))
  };
}

export default connect(null, mapDispatchToProps)(WorkspacePage);
// export default WorkspacePage;
