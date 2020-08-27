import React, { useEffect } from 'react';
import styles from './styles.module.sass';
import { connect } from 'react-redux';
import { IAppState } from 'common/models/store';
import { fetchDraftsRoutine } from './routines';
import DraftCard from './components/DraftCard';
import { IDraftClient } from 'common/models/draft/IDraftClient';

interface IProps {
  posts: IDraftClient[];
  comments: IDraftClient[];
  fetchDrafts: (wpId: string) => void;
  workspaceId: string;
  whash: string;
}

const Drafts: React.FC<IProps> = ({ posts, comments, fetchDrafts, workspaceId, whash }) => {
  useEffect(() => {
    if (workspaceId) {
      fetchDrafts(workspaceId);
    }
  }, []);

  const createCards = (drafts: (IDraftClient)[]) => drafts.map(d => (
    <DraftCard draft={d} key={d.id} whash={whash} />
  ));

  return (
    <div className={styles.body}>

      <div className={styles.wrapper}>
        {createCards([...posts, ...comments])}
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  posts: state.drafts.posts,
  comments: state.drafts.comments,
  workspaceId: state.workspace.workspace.id,
  whash: state.workspace.workspace.hash
});

const mapDispatchToProps = {
  fetchDrafts: fetchDraftsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Drafts);
