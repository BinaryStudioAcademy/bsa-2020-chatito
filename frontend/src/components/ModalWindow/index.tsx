import React, { ReactNode } from 'react';
import { Modal } from 'react-bootstrap';
import { IBindingAction } from 'common/models/callback/IBindingActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import styles from './styles.module.sass';

interface IProps {
  isShown: boolean;
  onHide: IBindingAction;
  children: ReactNode;
  contentClassName?: string;
  modalClassName?: string;
  hideCloseBtn?: boolean;
  modalBody?: string;
  withoutPaddings?: boolean;
}

const ModalWindow: React.FC<IProps> = ({
  isShown,
  onHide,
  children,
  contentClassName = '',
  modalClassName = '',
  hideCloseBtn = false,
  modalBody = '',
  withoutPaddings = false
}) => (
  <Modal
    className={modalClassName}
    centered
    dialogClassName={`${styles.modal} ${contentClassName}`}
    enforceFocus={false}
    show={isShown}
    onHide={onHide}
  >
    {!hideCloseBtn && (
      <button type="button" className={styles.closeContainer}>
        <FontAwesomeIcon onClick={onHide} icon={faTimesCircle} className={styles.closeBtn} />
      </button>
    )}
    <Modal.Body bsPrefix={modalBody} className={withoutPaddings ? styles.modalBody : ''}>
      {children}
    </Modal.Body>
  </Modal>
);

export default ModalWindow;
