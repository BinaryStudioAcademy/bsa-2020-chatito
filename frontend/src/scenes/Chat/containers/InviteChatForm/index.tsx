import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.sass';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { InputGroup, FormControl, Button, Popover, OverlayTrigger } from 'react-bootstrap';
import { IAppState } from 'common/models/store';
import { IUser } from 'common/models/user/IUser';
import LoaderWrapper from 'components/LoaderWrapper';
import { searchUsers } from 'common/helpers/searchHelper';
import { addUsersToChatRoutine, fetchChatUsersRoutine } from 'scenes/Chat/routines';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import { IAddUsersToChat } from 'common/models/chat/IAddUsersToChat';
import { getWorkspaceUsers } from 'services/workspaceService';
import { IBindingAction } from 'common/models/callback/IBindingActions';

interface IProps {
  workspaceId: string;
  chatId: string;
  chatUsers: IUser[];
  hideCallback: IBindingAction;
  addUsersToChat: IBindingCallback1<IAddUsersToChat>;
  getUserList: CallableFunction;
}

let timer: NodeJS.Timeout;

const InviteChatForm: React.FC<IProps> = ({ workspaceId,
  chatId, hideCallback, addUsersToChat, chatUsers, getUserList }) => {
  const [text, setText] = useState('');
  const [searchedUsers, setSearchedUsers] = useState<IUser[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  useEffect(() => {
    getWorkspaceUsers(workspaceId).then(usersArr => setUsers(usersArr));
  }, []);
  const searchUserHandler = (str: string) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      const result = searchUsers(str, users);
      setSearchedUsers(result);
    }, 200);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setText(value);
    searchUserHandler(value);
  };

  const onHide = () => {
    setText('');
    setSelectedUsers([]);
    hideCallback();
  };

  const onSelectUser = (user: IUser) => {
    if (chatUsers.find(chatUser => chatUser.id === user.id)) {
      return;
    }
    if (!selectedUsers.find(selUser => selUser.id === user.id)) {
      setSelectedUsers(state => [...state, user]);
    }
    setText('');
  };

  const onUnselectUser = (id: string) => {
    setSelectedUsers(state => [...state.filter(user => user.id !== id)]);
  };

  const onAdd = async () => {
    const userIds = selectedUsers.map(user => user.id);
    await addUsersToChat({ chatId, userIds });
    await getUserList(chatId);
    onHide();
  };

  const popover = (
    <Popover id="popover-basic" className={styles.popover}>
      {searchedUsers.length
        ? searchedUsers.map(user => {
          const isUserInChat = !!chatUsers.find(chatUser => chatUser.id === user.id);
          const statusCls = [styles.status, styles.online];
          const btnCls = [isUserInChat ? styles.chatUser : '', styles.userItem, 'button-unstyled', 'noselect'];
          return (
            <button className={btnCls.join(' ')} onClick={() => onSelectUser(user)} type="button" key={user.id}>
              <div className={styles.userInfoBlock}>
                <span className={styles.fullName}>{user.fullName}</span>
                <i className={statusCls.join(' ')} />
                <span className={styles.displayName}>{user.displayName}</span>
              </div>
              {isUserInChat && <span className={styles.additional}>Already in this channel</span>}
            </button>
          );
        })
        : (
          <div className={styles.notFound}>
            <span>No one found matching</span>
            <strong>{text}</strong>
          </div>
        )}
    </Popover>
  );

  return (
    <div className={styles.modalWrp}>
      <div className="modalHeader">
        <p>Add people</p>
      </div>
      <div className="modalBody">
        <div className={styles.selectedUsersWrp}>
          {selectedUsers.map(selUser => (
            <div className={styles.selectedUser} key={selUser.id}>
              <div className={`${styles.selectedUsername} noselect`}>{selUser.fullName}</div>
              <FontAwesomeIcon onClick={() => onUnselectUser(selUser.id)} icon={faTimes} className={styles.closeBtn} />
            </div>
          ))}
        </div>
        <LoaderWrapper loading={!users.length} height="50px">
          <div className={styles.popoverWrapper}>
            <OverlayTrigger trigger="focus" overlay={popover} placement="bottom" show={!!text}>
              <div className={styles.wrapper}>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="Search by name or email"
                    onChange={onChange}
                    value={text}
                    className={styles.searchInput}
                  />
                </InputGroup>
                <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
              </div>
            </OverlayTrigger>
          </div>
        </LoaderWrapper>
      </div>
      <div className={`${styles.buttonsContainer} buttonsContainer`}>
        <Button variant="secondary" className="appButton save" disabled={!selectedUsers.length} onClick={onAdd}>
          Add
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  workspaceId: state.workspace.workspace.id
});

const mapDispatchToProps = {
  addUsersToChat: addUsersToChatRoutine,
  getUserList: fetchChatUsersRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(InviteChatForm);
