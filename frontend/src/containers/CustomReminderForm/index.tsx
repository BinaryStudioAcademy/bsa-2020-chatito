import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import styles from './styles.module.sass';
import { ModalTypes } from 'common/enums/ModalTypes';
import ModalWindow from 'components/ModalWindow';
import { connect } from 'react-redux';
import { IAppState } from 'common/models/store';
import { showModalRoutine } from 'routines/modal';

interface IProps {
  toggleModal: IBindingCallback1<any>;
}

const getCurrentDateData = () => {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const currentHours = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes() + 1;

  const currentFullDate = `${currentYear}-${currentMonth}-${currentDay}`;
  const currentTime = `${currentHours}:${currentMinutes}`;

  return {
    currentFullDate,
    currentTime,
    currentDay,
    currentMonth,
    currentYear,
    currentHours,
    currentMinutes,
    currentDate
  };
};

const CustomReminderForm = ({ toggleModal }: IProps) => {
  const { currentFullDate, currentTime, currentDate } = getCurrentDateData();

  const [day, setReminderDay] = useState<string>(currentFullDate);
  const [time, setReminderTime] = useState<string>(currentTime);
  const [note, setNote] = useState<string>('');

  const isInitial = (day === currentFullDate && time === currentTime);

  const validateFormData = () => {
    const reminderDate = new Date(`${day} ${time}`);
    if (currentDate > reminderDate) {
      return false;
    }
    return true;
  };

  const isValidDate = validateFormData();

  const handleSubmit = () => {
    // createChannel({
    //   day,
    //   time,
    //   note
    // });
    if (validateFormData()) {
      console.log(day, time, note);
    }
  };

  const title = 'Create a reminder';

  const formHeader = (
    <h2 className={styles.header}>{title}</h2>
  );

  const dayInputFormGroup = (
    <Form.Group>
      <Form.Label htmlFor="day" className={styles.inputLabel}>
        When
      </Form.Label>
      <InputGroup className="mb-3">
        <Form.Control
          id="day"
          type="date"
          placeholder="Today"
          onChange={event => setReminderDay(event.target.value)}
          required
        />
      </InputGroup>
    </Form.Group>
  );

  const timeInputFormGroup = (
    <Form.Group>
      <Form.Label htmlFor="day" className={styles.inputLabel}>
        Time
      </Form.Label>
      <InputGroup className="mb-3">
        <Form.Control
          id="time"
          type="time"
          placeholder="Now"
          onChange={event => setReminderTime(event.target.value)}
          required
        />
      </InputGroup>
    </Form.Group>
  );

  const noteInputFormGroup = (
    <Form.Group>
      <Form.Label htmlFor="day" className={styles.inputLabel}>
        Add a note
        <span>(optional)</span>
      </Form.Label>
      <InputGroup className="mb-3">
        <Form.Control
          id="note"
          placeholder="Remind me to.."
          onChange={event => setNote(event.target.value)}
        />
      </InputGroup>
    </Form.Group>
  );

  const formBody = (
    <div className={styles.formBody}>
      <Form>
        {dayInputFormGroup}
        {timeInputFormGroup}
        {noteInputFormGroup}
      </Form>
    </div>
  );

  const formFooter = (
    <div className={styles.footer}>
      <Button
        variant="secondary"
        onClick={handleSubmit}
      >
        Cancel
      </Button>
      <Button
        variant="primary"
        onClick={handleSubmit}
        className={styles.btnCreate}
        disabled={!isValidDate}
      >
        {isInitial ? 'Remind now' : 'Create'}
      </Button>
    </div>
  );

  const handleCloseModal = () => {
    toggleModal({ modalType: ModalTypes.CreateChannel, show: false });
  };

  return (
    <ModalWindow
      isShown={!false}
      onHide={handleCloseModal}
    >
      {formHeader}
      {formBody}
      {formFooter}
    </ModalWindow>
  );
};

const mapStateToProps = (state: IAppState) => {
  const {
    modal: { createChannel }
  } = state;

  return {
    isShown: createChannel
  };
};

const mapDispatchToProps = {
  toggleModal: showModalRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomReminderForm);
