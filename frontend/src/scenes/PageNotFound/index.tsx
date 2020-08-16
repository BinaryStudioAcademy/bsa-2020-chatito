import React, { FunctionComponent } from 'react';
import styles from './styles.module.sass';
import { Routes } from 'common/enums/Routes';
import { ReactComponent as Upset } from 'img/error404.svg';
import { Button } from 'react-bootstrap';

const PageNotFound: FunctionComponent = () => {
  const onClick = () => { window.location.href = Routes.Workspace; };
  return (
    <div className={styles.notFoundPage}>
      <div className={styles.centralBlock}>
        <Upset className={styles.upset} />
        <div className={styles.messageContainer}>
          <div className={styles.text}>
            <p>OOPS!</p>
            <p>Page not found</p>
          </div>
          <div className={`${styles.formFooter} w-100`}>
            <Button
              type="submit"
              variant="primary"
              className={styles.primaryBtn}
              onClick={onClick}
            >
              Go to Homepage
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
