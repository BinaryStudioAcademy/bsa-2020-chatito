import React, { FunctionComponent, useState } from 'react';
import { connect } from 'react-redux';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { IAppState } from 'common/models/store';
import { IModalRoutine } from 'common/models/modal/IShowModalRoutine';
import { ModalTypes } from 'common/enums/ModalTypes';
import { showModalRoutine } from 'routines/modal';
import ModalWindow from 'components/ModalWindow';
import { IChat } from 'common/models/chat/IChat';
import { removeUserFromChatRoutine } from 'scenes/Chat/routines';
import { IUser } from 'common/models/user/IUser';
import ChatMember from 'components/ChatMember';
import styles from './styles.module.sass';
import Button from 'react-bootstrap/Button';
import SearchInput from 'components/SearchInput';

interface IProps {
  isShown: boolean;
  chat: IChat;
  currentUser: IUser;
  removeUser: CallableFunction;
  toggleModal: IBindingCallback1<IModalRoutine>;
  isUserChatMember: boolean;
}

const ChatMembers: FunctionComponent<any> = ({
  isShown,
  toggleModal,
  removeUser,
  chat,
  currentUser,
  isUserChatMember
}: IProps) => {
  const [searchStr, setSearchStr] = useState('');
  const handleCloseModal = () => {
    setSearchStr('');
    toggleModal({ modalType: ModalTypes.ChatMembers, show: false });
  };

  const removeUserFromChat = async (userId: string) => {
    await removeUser({ chatId: chat.id, userId });
  };

  const onInvite = () => {
    toggleModal({ modalType: ModalTypes.ChatMembers, show: false });
    toggleModal({ modalType: ModalTypes.InviteChat, show: true });
  };
  const isSuitable = (user: IUser) => (
    user.displayName.toLowerCase().includes(searchStr.toLowerCase())
    || user.email.includes(searchStr)
  );
  const isCreator = chat.createdByUserId === currentUser.id;

  return (
    <ModalWindow
      isShown={isShown}
      onHide={handleCloseModal}
    >
      <div>
        <div className="modalHeader">
          <p>Chat members</p>
        </div>
        <div className="modalBody">
          <SearchInput
            onSearch={setSearchStr}
            placeholder="Search by name or email"
            stylesClassName={styles.searchInput}
          />
          {
            chat.users.map((user: IUser) => {
              if (!isSuitable(user)) {
                return null;
              }
              return (
                <ChatMember
                  removeUser={removeUserFromChat}
                  user={user}
                  key={user.id}
                  isCreator={isCreator}
                  currentUser={currentUser}
                />
              );
            })
          }
        </div>
        <div className={`${styles.butonsContainer} buttonsContainer`}>
          {isUserChatMember && (
            <Button
              type="button"
              variant="secondary"
              className="appButton save"
              onClick={onInvite}
            >
              Add
            </Button>
          )}
        </div>
      </div>
    </ModalWindow>
  );
};

const mapStateToProps = (state: IAppState) => {
  const {
    chat: { chat },
    modal: { chatMembers },
    user: { user: currentUser }
  } = state;
  return {
    isShown: chatMembers,
    chat,
    currentUser
  };
};

const mapDispatchToProps = {
  removeUser: removeUserFromChatRoutine,
  toggleModal: showModalRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatMembers);
