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
  getUserList: CallableFunction;
  removeUser: CallableFunction;
  toggleModal: IBindingCallback1<IModalRoutine>;
}

const ChatMembers: FunctionComponent<any> = ({
  isShown,
  toggleModal,
  getUserList,
  removeUser,
  chat
}: IProps) => {
  const handleCloseModal = () => {
    toggleModal({ modalType: ModalTypes.ChatMembers, show: false });
  };

  const removeUserFromChat = async (userId: string) => {
    await removeUser({ chatId: chat.id, userId });
  };

  getUserList(chat.id);
  return (
    <ModalWindow
      isShown={isShown}
      onHide={handleCloseModal}
    >
      <div>
        {chat.users.map((user: IUser) => <ChatMember removeUser={removeUserFromChat} user={user} key={user.id} />)}
      </div>
    </ModalWindow>
  );
};

const mapStateToProps = (state: IAppState) => {
  const {
    chat: { chat },
    modal: { chatMembers }
  } = state;

  return {
    isShown: chatMembers,
    chat
  };
};

const mapDispatchToProps = {
  getUserList: fetchChatUsersRoutine,
  removeUser: removeUserFromChatRoutine,
  toggleModal: showModalRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatMembers);
