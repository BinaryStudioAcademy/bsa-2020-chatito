import React from 'react';
import AddWorkspace from './containers/AddWorkspace';
import styles from './styles.module.sass';

const CreateNewWorkspace = () => (
  <div className={styles.workspace}>
    <AddWorkspace />
  </div>
);

export default CreateNewWorkspace;
