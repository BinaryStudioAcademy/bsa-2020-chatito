import React, { useEffect } from 'react';
import styles from './styles.module.sass';
import { connect } from 'react-redux';
import { IAppState } from 'common/models/store';
import { IDraftPost } from 'common/models/draft/IDraftPost';
import { IDraftComment } from 'common/models/draft/IDraftComment';
import { fetchDraftsRoutine } from './routines';

interface IProps {
  posts: IDraftPost[];
  comments: IDraftComment[];
  fetchDrafts: () => void;
}

const createCards = (drafts: (IDraftComment | IDraftPost)[]) => drafts.map(d => (
  <div className={styles.card} key={d.id}>
    hello
  </div>
));

const Drafts: React.FC<IProps> = ({ posts, comments, fetchDrafts }) => {
  useEffect(() => {
    fetchDrafts();
  }, []);

  return (
    <div className={styles.body}>

      <div className={styles.wrapper}>
        {createCards([...posts, ...comments])}
        {createCards([...posts, ...comments])}

        {/* {console.log([...posts, ...comments])} */}
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  posts: state.drafts.posts,
  comments: state.drafts.comments
});

const mapDispatchToProps = {
  fetchDrafts: fetchDraftsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Drafts);
