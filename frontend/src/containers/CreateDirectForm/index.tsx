import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import styles from './styles.module.sass';
import { IUser } from 'common/models/user/IUser';
import MultiSelect from 'react-multi-select-component';
import { IAppState } from 'common/models/store';
import { fetchWorkspaceUsersRoutine } from 'scenes/Workspace/routines';
import { connect } from 'react-redux';
import { IWorkspace } from 'common/models/workspace/IWorkspace';
import { IChat } from 'common/models/chat/IChat';
import { push } from 'connected-react-router';
import { Routes } from 'common/enums/Routes';
import { IBindingAction } from 'common/models/callback/IBindingActions';

interface IProps {
  createDirect: IBindingCallback1<any>;
  getUsers: (workspaceId: string) => void;
  workspace: IWorkspace;
  allUsers: IUser[];
  directMessages: IChat[];
  currentUserId: string;
  router: (route: string) => void;
  closeModal: IBindingAction;
}

interface IOption {
  value: any;
  label: string;
}

const CreateDirect = ({ workspace, allUsers, directMessages, currentUserId,
  createDirect, getUsers, router, closeModal }: IProps) => {
  const [DirectUsers, setDirectUsers] = useState([]);

  getUsers(workspace.id);
  const mapOptionsToUsers = (options: IOption[]) => allUsers
    .filter(user => options.map(({ value }) => value).indexOf(user.id) !== -1);

  const mapUsersToOptions = (_users: IUser[]) => _users.map(({ id, displayName }) => (
    { label: displayName, value: id }
  ));

  const options = mapUsersToOptions(allUsers);

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

  const title = 'Create a Direct';

  const formHeader = (
    <h4 className={styles.header}>{title}</h4>
  );

  const addMembers = (
    <Form.Group>
      <MultiSelect
        options={options}
        value={DirectUsers}
        onChange={setDirectUsers}
        labelledBy="Select"
        hasSelectAll={false}
      />
    </Form.Group>
  );

  const formBody = (
    <div className={styles.formBody}>
      <p className={styles.formDescription}>
        Directs are where you can communicate with other people.
      </p>
      <Form>
        {addMembers}
      </Form>
    </div>
  );

  const formFooter = (
    <div className={styles.footer}>
      <Button
        disabled={isSelectEmpty()}
        variant="primary"
        onClick={handleSubmit}
      >
        Create
      </Button>
    </div>
  );

  return (
    <>
      {formHeader}
      {formBody}
      {formFooter}
    </>
  );
};

const mapStateToProps = (state: IAppState) => {
  const {
    workspace: { workspace, users, directMessages }
  } = state;

  return {
    workspace,
    directMessages,
    allUsers: users,
    currentUserId: state.user.user?.id as string
  };
};

const mapDispatchToProps = {
  getUsers: fetchWorkspaceUsersRoutine,
  router: push
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateDirect);
