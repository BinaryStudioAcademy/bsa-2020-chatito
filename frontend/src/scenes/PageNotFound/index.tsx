import React, { FunctionComponent } from 'react';
import styles from './styles.module.sass';
import { Routes } from '@enums/Routes';

const PageNotFound: FunctionComponent = () => (
  <div className={`${styles.notFoundPage} ${styles.textColor}`}>
    <div className="d-flex flex-column justify-center align-items-center">
      <h1 className={`text-center ${styles.title}`}>404: Page Not Found</h1>
      <span className="text-center">
        Go to
        <a className={styles.homeRef} href={Routes.BaseUrl}>  Home page</a>
      </span>
    </div>
  </div>
);

export default PageNotFound;
