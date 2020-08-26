import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './styles.module.sass';
import { ReactComponent as Upset } from 'img/error404.svg';
import { Button } from 'react-bootstrap';
import Header from 'containers/Header';
import { IAppState } from 'common/models/store';

interface IProps {
  isCurrentUser: boolean;
}

const PageNotFound: React.FC<IProps> = ({ isCurrentUser }) => {
  const pageStyles = [styles.notFoundPage, !isCurrentUser ? styles.fullHeight : ''];
  return (
    <>
      {isCurrentUser && <Header />}
      <div className={pageStyles.join(' ')}>
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
    </>
  );
};

const mapStateToProps = (state: IAppState) => ({
  isCurrentUser: !!state.user.user?.id
});

export default connect(mapStateToProps, null)(PageNotFound);
