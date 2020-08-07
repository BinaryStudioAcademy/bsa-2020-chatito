import React from 'react';
import CreateChannelForm from '../../components/CreateChannelForm';
import { connect } from 'react-redux';
import { IBindingCallback1, IBindingAction } from '../../common/models/callback';
import { ICreateChannel } from '../../common/models/channel';
import { createChannelRoutine, toggleCreateChannelModalRoutine } from '../../routines/channel';

import ModalWindow from '../../components/ModalWindow';

interface IProps {
  createChannel: IBindingCallback1<ICreateChannel>;
  toggleModal: IBindingAction;
}

const CreateChannelModalWrapper = ({
  createChannel,
  toggleModal }: IProps) => (
    <ModalWindow
      isShown
      onHide={toggleModal}
    >
      <CreateChannelForm toggle={toggleModal} createChannel={createChannel} />
    </ModalWindow>
);

const mapDispatchToProps = {
  createChannel: createChannelRoutine,
  toggleModal: toggleCreateChannelModalRoutine
};

export default connect(null, mapDispatchToProps)(CreateChannelModalWrapper);
