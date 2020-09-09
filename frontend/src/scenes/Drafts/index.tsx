import React, { useEffect } from 'react';
import styles from './styles.module.sass';
import { connect } from 'react-redux';
import { IAppState } from 'common/models/store';
import { fetchDraftsRoutine } from './routines';
import DraftCard from './components/DraftCard';
import NoDraftsMessage from './components/NoDraftsMessage';
import { IDraftClient } from 'common/models/draft/IDraftClient';
import LoaderWrapper from 'components/LoaderWrapper';

interface IProps {
  posts: IDraftClient[];
  comments: IDraftClient[];
  fetchDrafts: (wpId: string) => void;
  workspaceId: string;
  whash: string;
  loading: boolean;
}

const Drafts: React.FC<IProps> = ({ posts, comments, fetchDrafts, workspaceId, whash, loading }) => {
  useEffect(() => {
    if (workspaceId) {
      fetchDrafts(workspaceId);
    }
  }, []);

  const createCards = (drafts: (IDraftClient)[]) => drafts.map(d => (
    <DraftCard draft={d} key={d.id} whash={whash} />
  ));

  return (
    <>
      <div className={styles.draftsHeaderBlock}>
        <span>Drafts</span>
      </div>
      <LoaderWrapper loading={loading}>
        <div className={styles.body}>
          {[...posts, ...comments].length
            ? (
              <div className={styles.wrapper}>
                {createCards([...posts, ...comments])}
              </div>
            )
            : <NoDraftsMessage />}
        </div>
      </LoaderWrapper>
    </>
  );
};

const mapStateToProps = (state: IAppState) => ({
  loading: state.drafts.loading,
  posts: state.drafts.posts,
  comments: state.drafts.comments,
  workspaceId: state.workspace.workspace.id,
  whash: state.workspace.workspace.hash
});

const mapDispatchToProps = {
  fetchDrafts: fetchDraftsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Drafts);
