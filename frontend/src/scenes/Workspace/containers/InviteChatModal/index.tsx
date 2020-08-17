import React, { useState } from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.sass';
import ModalWindow from 'components/ModalWindow';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { IModalRoutine } from 'common/models/modal/IShowModalRoutine';
import { InputGroup, FormControl, Button, Popover, OverlayTrigger } from 'react-bootstrap';
import { showModalRoutine } from 'routines/modal';
import { IAppState } from 'common/models/store';
import { ModalTypes } from 'common/enums/ModalTypes';
import { IUser } from 'common/models/user/IUser';

interface IProps {
  isShown: boolean;
  toggleModal: IBindingCallback1<IModalRoutine>;
}

const InviteChatModal: React.FC<IProps> = ({ isShown, toggleModal }) => {
  const [users, setUsers] = useState<IUser>([]);
  const handleCloseModal = () => {
    toggleModal({ modalType: ModalTypes.InviteChat, show: !isShown });
  };

  let timer;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const timer = setTimeout(() => {
      console.log('fetch users');

    }, 200);
  };

  const popover = (
    <Popover id="popover-basic" className={styles.popover}>
      <Popover.Content className={styles.content}>
        {users.map(user => {
          const statusCls = [styles.status, user.status === 'online' ? styles.online : styles.offline];
          return (
            <div className={`${styles.userItem} noselect`}>
              <span className={styles.fullName}>{user.fullName}</span>
              <i className={statusCls.join(' ')} />
              <span className={styles.displayName}>{user.displayName}</span>
            </div>
          );
        })}
      </Popover.Content>
    </Popover>
  );

  return (
    <ModalWindow isShown={isShown} onHide={handleCloseModal}>
      <h4>Add people</h4>
      <p className="mb-3">Chat name</p>
      <OverlayTrigger trigger="click" overlay={popover} placement="bottom">
        <InputGroup className="mb-3">
          <FormControl placeholder="Find by name or email" onChange={onChange} />
        </InputGroup>
      </OverlayTrigger>
      <Button variant="primary">Add</Button>
    </ModalWindow>
  );
};

const mapStateToProps = (state: IAppState) => ({
  isShown: state.modal.inviteChat
});

const mapDispatchToProps = {
  toggleModal: showModalRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(InviteChatModal);
