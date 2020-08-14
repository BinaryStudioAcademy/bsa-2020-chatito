import React, { FunctionComponent } from 'react';
import CreateChannelForm from 'components/CreateChannelForm';
import { connect } from 'react-redux';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { ICreateChat } from 'common/models/chat/ICreateChat';
import { IAppState } from 'common/models/store';
import { IModalRoutine } from 'common/models/modal/IShowModalRoutine';
import { ModalTypes } from 'common/enums/ModalTypes';
import { showModalRoutine } from 'routines/modal';
import ModalWindow from 'components/ModalWindow';
import { IWorkspace } from 'common/models/workspace/IWorkspace';
import { ChatType } from 'common/enums/ChatType';
import { createChatRoutine } from 'scenes/Chat/routines';
import { fetchChatUsersRoutine } from 'routines/user';
import { IChat } from 'common/models/chat/IChat';

interface IProps {
  isShown: boolean;
  chat: IChat;
  getUserList: CallableFunction;
  toggleModal: IBindingCallback1<IModalRoutine>;
}

const ChatMembers: FunctionComponent<IProps> = ({
  isShown,
  toggleModal,
  getUserList,
  chat
}: IProps) => {
  const handleCloseModal = () => {
    toggleModal({ modalType: ModalTypes.CreateChannel, show: false });
  };

  const chatMembers = getUserList(chat.id);
  return (
    <ModalWindow
      isShown={isShown}
      onHide={handleCloseModal}
    >
      <div>
        {chatMembers}
      </div>
    </ModalWindow>
  );
};

const mapStateToProps = (state: IAppState) => {
  const {
    chat: { chat },
  } = state;

  return {
    isShown: true,
    chat
  };
};

const mapDispatchToProps = {
  getUserList: fetchChatUsersRoutine,
  toggleModal: showModalRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatMembers);
