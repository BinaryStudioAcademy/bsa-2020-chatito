import React from 'react';
import CreateChannelForm from 'components/CreateChannelForm';
import { connect } from 'react-redux';
import { IBindingCallback1 } from 'common/models/callback';
import { ICreateChannel } from 'common/models/channel/ICreateChannel';
import { IAppState } from 'common/models/store';
import { IModalRoutine } from 'common/models/modal/IShowModalRoutine';
import { ModalTypes } from 'common/enums/ModalTypes';
import { createChannelRoutine } from 'routines/channel';
import { showModalRoutine } from 'routines/modal';
import ModalWindow from 'components/ModalWindow';

interface IProps {
  isShown: boolean;
  createChannel: IBindingCallback1<ICreateChannel>;
  toggleModal: IBindingCallback1<IModalRoutine>;
}

const CreateChannelModal = ({
  isShown,
  createChannel,
  toggleModal
}: IProps) => {
  const handleCloseModal = () => {
    toggleModal({ modalType: ModalTypes.CreateChannel, show: false });
  };
  return (
    <ModalWindow
      isShown={isShown}
      onHide={handleCloseModal}
    >
      <CreateChannelForm createChannel={createChannel} />
    </ModalWindow>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { modal: { createChannel } } = state;
  return {
    isShown: createChannel
  };
};

const mapDispatchToProps = {
  createChannel: createChannelRoutine,
  toggleModal: showModalRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateChannelModal);
