import React, { useState, FunctionComponent } from 'react';
import { Form, Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import styles from './styles.module.sass';
import logo from '../../img/chatitoTemp.png';
import bgImg from '../../img/bg-img.png';
import { connect } from 'react-redux';
import { addWorkspaceRoutine } from '../../scenes/Workspace/routines';

type IFetchWorkspace<T, S> = (name: T) => S;

interface IProps {
  addWorkspace: IFetchWorkspace<string, void>;
}

const AddWorkspace: FunctionComponent<IProps> = props => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log('changes');
  };
  const onSubmit = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    props.addWorkspace(e.target.value);
  };

  const [name, setState] = useState('');
  return (
    <div className={styles.AddWorkspace__container}>
      <Form className={styles.inputWorkspace} onSubmit={onSubmit}>
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
          type="submit"
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
  );
};

const mapDispatchToProps = {
  addWorkspace: addWorkspaceRoutine
};

export default connect(null, mapDispatchToProps)(AddWorkspace);
