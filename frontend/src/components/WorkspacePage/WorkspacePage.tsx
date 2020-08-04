import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import styles from './WorkspacePage.module.sass';
import logo from '../../img/chatitoTemp.png';
import bgImg from '../../img/bg-img.png';
import { connect, useDispatch } from 'react-redux';
import addWorkspace from '../../reducers/actions/actions';

// const dispatch = useDispatch();

const WorkspacePage = () => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(e.currentTarget.value);
  };
  const onSubmit = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    console.log('sth');
  };

  const [name, setState] = useState('');
  return (
    <div className={styles.workspacePage}>
      <div className={styles.workspacePage__container}>
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
    </div>
  );
};

// WorkspacePage.propTypes = {
//   addWorkspace: PropTypes.func.isRequired
// };

export default WorkspacePage;
// const actions = { addWorkspace };

// const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
// export default connect(null, mapDispatchToProps)(WorkspacePage);
