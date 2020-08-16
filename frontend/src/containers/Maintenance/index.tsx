import React, { FunctionComponent } from 'react';
import styles from './styles.module.sass';
import { ReactComponent as Disconnected } from 'img/maintenancePage.svg';
import { ReactComponent as Logo } from 'img/logo-icon.svg';

const Maintenance: FunctionComponent = () => (
  <div className={styles.notFoundPage}>
    <div className={styles.centralBlock}>
      <div className={styles.logoContainer}>
        <Logo className={styles.logo} />
        <span className={styles.logoText}>Chatito</span>
      </div>
      <p className={styles.message}>
        The site is currently down
        <br />
        for maitnenance
      </p>
      <Disconnected className={styles.upset} />
    </div>
  </div>
);

export default Maintenance;
