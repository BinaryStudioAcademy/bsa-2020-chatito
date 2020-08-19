import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.sass';
import { ReactComponent as Upset } from 'img/error404.svg';
import { Button } from 'react-bootstrap';

const PageNotFound: FunctionComponent = () => (
  <div className={styles.notFoundPage}>
    <div className={styles.centralBlock}>
      <Upset className={styles.upset} />
      <div className={styles.messageContainer}>
        <div className={styles.text}>
          <p>OOPS!</p>
          <p>Page not found</p>
        </div>
        <div className={`${styles.formFooter} w-100`}>
          <Link to="/">
            <Button
              type="submit"
              variant="primary"
              className={styles.primaryBtn}
            >
              Go to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default PageNotFound;
