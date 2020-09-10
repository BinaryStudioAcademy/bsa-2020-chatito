import React from 'react';
import { connect } from 'react-redux';
import ModalWindow from 'components/ModalWindow';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { IModalRoutine } from 'common/models/modal/IShowModalRoutine';
import { IAppState } from 'common/models/store';
import { ModalTypes } from 'common/enums/ModalTypes';
import { IUser } from 'common/models/user/IUser';
import InviteChatForm from 'scenes/Chat/containers/InviteChatForm';

interface IProps {
  isShown: boolean;
  postsLoading: boolean;
  chatId: string;
  chatUsers: IUser[];
  toggleModal: IBindingCallback1<IModalRoutine>;
}
const InviteChatModal: React.FC<IProps> = ({ chatId, chatUsers,
  isShown, postsLoading, toggleModal }) => {
  const onHide = () => {
    toggleModal({ modalType: ModalTypes.InviteChat, show: !isShown });
  };
  return (
    <ModalWindow isShown={!postsLoading && isShown} onHide={onHide}>
      <InviteChatForm
        hideCallback={onHide}
        chatId={chatId}
        chatUsers={chatUsers}
      />
    </ModalWindow>
  );
};

const mapStateToProps = (state: IAppState) => ({
  isShown: state.modal.inviteChat,
  postsLoading: state.chat.loading
});

export default connect(mapStateToProps)(InviteChatModal);
