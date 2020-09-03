import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { IAppState } from 'common/models/store';
import { showModalRoutine } from 'routines/modal';
import { ModalTypes } from 'common/enums/ModalTypes';
import { IModalRoutine } from 'common/models/modal/IShowModalRoutine';
import ModalWindow from 'components/ModalWindow';
import ChangeStatusForm from 'containers/ChangeStatusForm';

interface IProps {
  showModal: ({ modalType, show }: IModalRoutine) => void;
  isShown: boolean;
}

const ChangeStatusModal: FunctionComponent<IProps> = ({ showModal, isShown }) => {
  const withoutPaddings = true;
  const handleClose = () => {
    showModal({ modalType: ModalTypes.ChangeStatus, show: false });
  };

  return (
    <ModalWindow isShown={isShown} onHide={handleClose} withoutPaddings={withoutPaddings}>
      <ChangeStatusForm handleClose={handleClose} />
    </ModalWindow>
  );
};

const mapStateToProps = (state: IAppState) => ({
  isShown: state.modal.changeStatus
});

const mapDispatchToProps = {
  showModal: showModalRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeStatusModal);
