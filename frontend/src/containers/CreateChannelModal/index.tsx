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

interface IProps {
  isShown: boolean;
  createChannel: IBindingCallback1<ICreateChat>;
  toggleModal: IBindingCallback1<IModalRoutine>;
  workspace: IWorkspace;
}

interface IChannelModalData {
  name: string;
  description: string;
  isPrivate: boolean;
}

const CreateChannelModal: FunctionComponent<IProps> = ({
  isShown,
  createChannel,
  toggleModal,
  workspace
}: IProps) => {
  const handleCloseModal = () => {
    toggleModal({ modalType: ModalTypes.CreateChannel, show: false });
  };

  const getNewChannelData = ({ name, description, isPrivate }: IChannelModalData) => {
    const newChannel: ICreateChat = {
      name,
      description,
      isPrivate,
      type: ChatType.Channel,
      workspaceName: workspace.name
    };
    createChannel(newChannel);
    toggleModal({ modalType: ModalTypes.CreateChannel, show: false });
  };

  return (
    <ModalWindow
      isShown={isShown}
      onHide={handleCloseModal}
    >
      <CreateChannelForm createChannel={getNewChannelData} />
    </ModalWindow>
  );
};

const mapStateToProps = (state: IAppState) => {
  const {
    modal: { createChannel },
    workspace: { workspace }
  } = state;

  return {
    isShown: createChannel,
    workspace
  };
};

const mapDispatchToProps = {
  createChannel: createChatRoutine,
  toggleModal: showModalRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateChannelModal);
