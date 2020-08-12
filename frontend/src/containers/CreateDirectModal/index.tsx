import React, { FunctionComponent } from 'react';
import CreateDirectForm from 'components/CreateDirectForm';
import { connect } from 'react-redux';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { ICreateDirect } from 'common/models/direct/ICreateDirect';
import { IAppState } from 'common/models/store';
import { IModalRoutine } from 'common/models/modal/IShowModalRoutine';
import { ModalTypes } from 'common/enums/ModalTypes';
import { createDirectRoutine } from 'routines/direct';
import { showModalRoutine } from 'routines/modal';
import ModalWindow from 'components/ModalWindow';
import { IWorkspace } from 'common/models/workspace/IWorkspace';
import { ChatType } from 'common/enums/ChatType';
import { IUser } from 'common/models/user/IUser';

interface IProps {
  isShown: boolean;
  createDirect: IBindingCallback1<ICreateDirect>;
  toggleModal: IBindingCallback1<IModalRoutine>;
  workspace: IWorkspace;
}

interface IDirectModalData {
  name: string;
  isPrivate: boolean;
  users: IUser[];
}

const CreateDirectModal: FunctionComponent<IProps> = ({
  isShown,
  createDirect,
  toggleModal,
  workspace
}: IProps) => {
  const handleCloseModal = () => {
    toggleModal({ modalType: ModalTypes.CreateDirect, show: false });
  };

  const getNewDirectData = ({ name, users, isPrivate }: IDirectModalData) => {
    const newDirect: ICreateDirect = {
      name,
      isPrivate,
      type: ChatType.DirectMessage,
      workspaceName: workspace.name,
      users
    };
    createDirect(newDirect);
  };

  return (
    <ModalWindow
      isShown={isShown}
      onHide={handleCloseModal}
    >
      <CreateDirectForm createDirect={getNewDirectData} users={workspace.users} />
    </ModalWindow>
  );
};

const mapStateToProps = (state: IAppState) => {
  const {
    modal: { createDirect },
    workspace: { workspace }
  } = state;

  return {
    isShown: createDirect,
    workspace
  };
};

const mapDispatchToProps = {
  createDirect: createDirectRoutine,
  toggleModal: showModalRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateDirectModal);
