import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import styles from './styles.module.sass';
import { IUser } from 'common/models/user/IUser';
import MultiSelect from 'react-multi-select-component';
import { IAppState } from 'common/models/store';
import { connect } from 'react-redux';
import { IWorkspace } from 'common/models/workspace/IWorkspace';
import { getWorkspaceUsers } from 'services/workspaceService';
import LoaderWrapper from 'components/LoaderWrapper';
import { IChat } from 'common/models/chat/IChat';
import { push } from 'connected-react-router';
import { Routes } from 'common/enums/Routes';
import { IBindingAction } from 'common/models/callback/IBindingActions';

interface IProps {
  createDirect: IBindingCallback1<any>;
  workspace: IWorkspace;
  directMessages: IChat[];
  currentUserId: string;
  router: (route: string) => void;
  closeModal: IBindingAction;
}

interface IOption {
  value: any;
  label: string;
  disabled?: boolean;
}

const CreateDirect = ({ workspace, directMessages, currentUserId,
  createDirect, router, closeModal }: IProps) => {
  const [DirectUsers, setDirectUsers] = useState<IOption[]>([]);
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  useEffect(() => {
    getWorkspaceUsers(workspace.id).then(usersArr => setAllUsers(usersArr));
  }, []);
  const mapOptionsToUsers = (options: IOption[]) => allUsers
    .filter(user => options.map(({ value }) => value).indexOf(user.id) !== -1);

  const mapUsersToOptions = (_users: IUser[]) => _users.map(({ id, displayName }) => (
    { label: displayName, value: id }
  ));

  const options = mapUsersToOptions(allUsers);
  const maxUsersNumber = 5;

  const isSelectEmpty = () => !DirectUsers.length;

  const findChatByUsers = (chats: IChat[], users: IUser[]) => {
    const containsAll = (arr1: any[], arr2: any[]) => arr2.every(arr2Item => arr1.includes(arr2Item));
    const userIds = [...users.map(user => user.id), currentUserId];

    return chats.find(chat => (
      chat.users.length === userIds.length && containsAll(chat.users.map(user => user.id), userIds)
    ));
  };

  const handleSubmit = () => {
    const directUsers = mapOptionsToUsers(DirectUsers).filter(user => user.id !== currentUserId);
    const chat = findChatByUsers(directMessages, directUsers);

    if (chat) {
      router(Routes.Chat.replace(':whash', workspace.hash).replace(':chash', chat.hash));
    } else {
      createDirect({
        name: `${DirectUsers.map(({ label }) => label).join(', ')}`,
        users: directUsers,
        isPrivate: (DirectUsers.length <= 2)
      });
    }

    closeModal();
  };

  const handleDirectUsersChange = (users: IOption[]) => {
    if (users.length <= maxUsersNumber) {
      setDirectUsers(users);
    }
  };

  const title = 'Create a Direct';

  const formHeader = (
    <header className="modalHeader">{title}</header>
  );

  const addMembers = (
    <Form.Group className="inputField">
      <MultiSelect
        className={styles.multiSelect}
        options={options}
        value={DirectUsers}
        onChange={handleDirectUsersChange}
        labelledBy="Select"
        hasSelectAll={false}
        focusSearchOnOpen
      />
    </Form.Group>
  );

  const formBody = (
    <div className="modalBody">
      <p className={styles.formDescription}>
        Directs are where you can communicate with other people.
      </p>
      <Form className={styles.inputContainer}>
        {addMembers}
      </Form>
      <div className={styles.label}>Maximum 5 users can be members of direct message</div>
    </div>
  );

  const formFooter = (
    <div className="buttonsContainer">
      <Button
        disabled={isSelectEmpty()}
        variant="secondary"
        onClick={handleSubmit}
        className="appButton save"
      >
        Create
      </Button>
    </div>
  );

  return (
    <>
      {formHeader}
      <LoaderWrapper loading={!allUsers.length} height="90px">
        {formBody}
      </LoaderWrapper>
      {formFooter}
    </>
  );
};

const mapStateToProps = (state: IAppState) => {
  const {
    workspace: { workspace, directMessages }
  } = state;

  return {
    workspace,
    directMessages,
    currentUserId: state.user.user?.id as string
  };
};

const mapDispatchToProps = {
  router: push
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateDirect);
