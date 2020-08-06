import React, { useState, ReactNode } from 'react';
import CreateChannelModal from '../CreateChannelModal';
import { connect } from 'react-redux';
import { IBindingCallback1 } from '../../common/models/callback';
import { ICreateChannel } from '../../common/models/channel';
import { createChannelRoutine } from '../../routines/channel';

interface IProps {
  children: ReactNode;
  createChannel: IBindingCallback1<ICreateChannel>;
}

const CreateChannelModalWrapper = ({ children, createChannel }: IProps) => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);

  return (
    <>
      <div role="link" style={{ display: 'inline-block' }} tabIndex={0} onKeyDown={toggleModal} onClick={toggleModal}>
        {children}
      </div>
      {showModal
        ? <CreateChannelModal toggle={toggleModal} createChannel={createChannel} />
        : null}
    </>
  );
};

const mapDispatchToProps = {
  createChannel: createChannelRoutine
};

export default connect(null, mapDispatchToProps)(CreateChannelModalWrapper);
