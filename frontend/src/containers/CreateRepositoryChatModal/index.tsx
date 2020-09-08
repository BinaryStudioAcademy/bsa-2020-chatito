import React, { FunctionComponent, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { IModalRoutine } from 'common/models/modal/IShowModalRoutine';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { IAppState } from 'common/models/store';
import { createChatRoutine } from 'scenes/Chat/routines';
import { showModalRoutine } from 'routines/modal';
import { ICreateChat } from 'common/models/chat/ICreateChat';
import { ModalTypes } from 'common/enums/ModalTypes';
import { Button, Form } from 'react-bootstrap';
import ModalWindow from 'components/ModalWindow';
import { getUserPublicGithubRepositories } from 'services/githubService';
import styles from './styles.module.sass';
import { ChatType } from 'common/enums/ChatType';
import { IWorkspace } from 'common/models/workspace/IWorkspace';
import { editProfileRoutine } from 'routines/user';
import { IUser } from 'common/models/user/IUser';
import CreateWebhookInstructionModal from 'containers/CreateWebhookInstructionModal';
import { Routes } from 'common/enums/Routes';
import { push } from 'connected-react-router';
import { IChat } from 'common/models/chat/IChat';

interface IProps {
  isShown: boolean;
  githubUsername?: string;
  workspace: IWorkspace;
  githubRepositories: Array<IChat>;
  user?: IUser;
  createRepositoryChat: IBindingCallback1<ICreateChat>;
  editProfile: IBindingCallback1<IUser>;
  showModal: IBindingCallback1<IModalRoutine>;
  router: (route: string) => void;
}

const CreateRepositoryChatModal: FunctionComponent<IProps> = ({
  isShown,
  githubUsername,
  workspace,
  githubRepositories,
  user,
  createRepositoryChat,
  editProfile,
  showModal,
  router
}) => {
  const [selectedRepository, setSelectedRepository] = useState('');
  const [showInstruction, setShowInstruction] = useState(false);
  const [repositories, setRepositories] = useState<string[]>([]);
  const [githubUsernameInput, setGithubUsernameInput] = useState(githubUsername || '');

  useEffect(() => {
    if (githubUsername) {
      getUserPublicGithubRepositories(githubUsername).then(repos => setRepositories(repos));
    }
  }, [githubUsername]);

  const handleCloseModal = () => {
    showModal({ modalType: ModalTypes.CreateRepositoryChat, show: false });
  };

  const findRepositoryByName = (repositoryName: string) => {
    const chat = githubRepositories.find(repo => repo.name === repositoryName);
    return chat;
  };

  const handleSubmit = () => {
    const chat = findRepositoryByName(selectedRepository);
    if (chat) {
      router(Routes.Chat.replace(':whash', workspace.hash).replace(':chash', chat.hash));
    } else {
      createRepositoryChat({
        name: selectedRepository,
        type: ChatType.GithubRepository,
        isPrivate: false,
        workspaceName: workspace.name
      });
    }

    setShowInstruction(true);
  };

  const handleUpdateGithubUsername = () => {
    if (user) {
      const { imageUrl, ...updateUser } = user; // eslint-disable-line @typescript-eslint/no-unused-vars
      const editUserProps = { ...updateUser, githubUsername: githubUsernameInput };
      editProfile(editUserProps);
    }
  };

  const modalHeader = (
    <header className="modalHeader">Add GitHub repository</header>
  );

  const selectRepositoryForm = (
    <Form.Control
      as="select"
      placeholder="Select"
      onChange={e => setSelectedRepository(e.target.value)}
      className={styles.selectForm}
    >
      <option>{}</option>
      {repositories.map(repo => (<option key={repo}>{repo}</option>))}
    </Form.Control>
  );

  const githubUsernameForm = (
    <>
      <span className={styles.inputHeader}>Please, enter your github username.</span>
      <div className={styles.usernameInputBlock}>
        <Form.Control
          type="text"
          placeholder="GitHub username"
          value={githubUsernameInput}
          onChange={e => setGithubUsernameInput(e.currentTarget.value)}
          className={styles.usernameInput}
        />
        <Button
          disabled={!githubUsernameInput}
          variant="secondary"
          onClick={handleUpdateGithubUsername}
          className="appButton save"
        >
          Update
        </Button>
      </div>
    </>
  );

  const modalFooter = (
    <div className="buttonsContainer">
      <Button
        disabled={!selectedRepository}
        variant="secondary"
        onClick={handleSubmit}
        className="appButton save"
      >
        Add
      </Button>
    </div>
  );

  const addRepositoryForm = (
    <>
      {modalHeader}
      <div className="modalBody">
        <Form.Group>
          {githubUsernameForm}
          {selectRepositoryForm}
        </Form.Group>
      </div>
      {modalFooter}
    </>
  );

  return (
    <>
      <ModalWindow isShown={isShown} onHide={handleCloseModal}>
        {!showInstruction
          ? addRepositoryForm
          : <CreateWebhookInstructionModal selectedRepository={selectedRepository} />}
      </ModalWindow>
    </>
  );
};

const mapStateToProps = (state: IAppState) => ({
  isShown: state.modal.createRepositoryChat,
  githubUsername: state.user.user?.githubUsername,
  workspace: state.workspace.workspace,
  githubRepositories: state.workspace.githubRepositories,
  user: state.user.user
});

const mapDispatchToProps = {
  createRepositoryChat: createChatRoutine,
  editProfile: editProfileRoutine,
  showModal: showModalRoutine,
  router: push
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateRepositoryChatModal);
