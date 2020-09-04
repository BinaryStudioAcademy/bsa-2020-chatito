import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { IAppState } from 'common/models/store';
import { showModalRoutine } from 'routines/modal';
import { ModalTypes } from 'common/enums/ModalTypes';
import { IModalRoutine } from 'common/models/modal/IShowModalRoutine';
import ModalWindow from 'components/ModalWindow';
import PreferencesForm from '../PreferencesForm';

interface IProps {
  showModal: ({ modalType, show }: IModalRoutine) => void;
  isShown: boolean;
}

const PreferencesModal: FunctionComponent<IProps> = ({ showModal, isShown }) => {
  const handleClose = () => {
    showModal({ modalType: ModalTypes.Preferences, show: false });
  };

  return (
    <ModalWindow isShown={isShown} onHide={handleClose}>
      <PreferencesForm handleClose={handleClose} />
    </ModalWindow>
  );
};

const mapStateToProps = (state: IAppState) => ({
  isShown: state.modal.preferences
});

const mapDispatchToProps = {
  showModal: showModalRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(PreferencesModal);
