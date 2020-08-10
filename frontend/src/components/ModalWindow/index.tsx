import React, { ReactNode } from 'react';
import { Modal } from 'react-bootstrap';
import { IBindingAction } from '@models/callback';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.sass';

interface IProps {
  isShown: boolean;
  onHide: IBindingAction;
  children: ReactNode;
  contentClassName?: string;
  modalClassName?: string;
  hideCloseBtn?: boolean;
}

const ModalWindow: React.FC<IProps> = ({
  isShown,
  onHide,
  children,
  contentClassName = '',
  modalClassName = '',
  hideCloseBtn = false
}) => (
  <Modal
    className={modalClassName}
    centered
    dialogClassName={`${styles.modal} ${contentClassName}`}
    enforceFocus={false}
    show={isShown}
    onHide={onHide}
  >
    {!hideCloseBtn && <FontAwesomeIcon onClick={onHide} icon={faTimes} className={styles.closeBtn} />}
    <Modal.Body bsPrefix={styles.modalBody}>
      {children}
    </Modal.Body>
  </Modal>
);

export default ModalWindow;
