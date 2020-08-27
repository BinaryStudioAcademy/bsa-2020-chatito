import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { IAppState } from 'common/models/store';
import { IModalRoutine } from 'common/models/modal/IShowModalRoutine';
import { ModalTypes } from 'common/enums/ModalTypes';
import { showModalRoutine } from 'routines/modal';
import ModalWindow from 'components/ModalWindow';
import { IChat } from 'common/models/chat/IChat';
import { fetchChatUsersRoutine, removeUserFromChatRoutine } from 'scenes/Chat/routines';
import { IUser } from 'common/models/user/IUser';
import ChatMember from 'components/ChatMember';

interface IProps {
  isShown: boolean;
  chat: IChat;
  currentUser: IUser;
  getUserList: CallableFunction;
  removeUser: CallableFunction;
  toggleModal: IBindingCallback1<IModalRoutine>;
}

const ChatMembers: FunctionComponent<any> = ({
  isShown,
  toggleModal,
  getUserList,
  removeUser,
  chat,
  currentUser
}: IProps) => {
  const handleCloseModal = () => {
    toggleModal({ modalType: ModalTypes.ChatMembers, show: false });
  };

  const removeUserFromChat = async (userId: string) => {
    await removeUser({ chatId: chat.id, userId });
    await getUserList(chat.id);
  };

  const onInvite = () => {
    toggleModal({ modalType: ModalTypes.InviteChat, show: true });
  };

  const isCreator = chat.createdByUserId === currentUser.id;

  return (
    <ModalWindow
      isShown={isShown}
      onHide={handleCloseModal}
    >
      <div>
        <button type="button" onClick={onInvite}>Add user</button>
        {
          chat.users.length <= 1
            ? 'You are the only member of this chat!'
            : chat.users.map((user: IUser) => {
              if (currentUser.id === user.id) {
                return null;
              }
              return (
                <ChatMember
                  removeUser={removeUserFromChat}
                  user={user}
                  key={user.id}
                  isCreator={isCreator}
                />
              );
            })
        }
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
  getUserList: fetchChatUsersRoutine,
  removeUser: removeUserFromChatRoutine,
  toggleModal: showModalRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatMembers);
