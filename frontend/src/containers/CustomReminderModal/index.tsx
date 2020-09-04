import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import styles from './styles.module.sass';
import { ModalTypes } from 'common/enums/ModalTypes';
import ModalWindow from 'components/ModalWindow';
import { connect } from 'react-redux';
import { IAppState } from 'common/models/store';
import { showModalRoutine } from 'routines/modal';
import { addReminderRoutine } from 'scenes/Chat/routines';
import DateTimePicker from 'react-datetime-picker';

interface IProps {
  toggleModal: IBindingCallback1<any>;
  addReminder: IBindingCallback1<any>;
  isShown: boolean;
  chatId?: string;
}

export const fromDateToReminderData = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const hours = date.getHours();
  const minutes = date.getMinutes() + 1;

  const fullDate = `${year}-${month}-${day}`;
  const time = `${hours}:${minutes}`;

  return {
    fullDate,
    time,
    day,
    month,
    year,
    hours,
    minutes
  };
};

export const getCurrentDateData = () => {
  const currentDate = new Date();
  const res = fromDateToReminderData(currentDate);

  return {
    currentDate,
    ...res
  };
};

const CustomReminderModal = ({ toggleModal, isShown, addReminder, chatId }: IProps) => {
  const { fullDate: currentFullDate, time: currentTime, currentDate } = getCurrentDateData();

  const [date, setReminderDate] = useState<Date>(new Date());
  const [day, setReminderDay] = useState<string>(currentFullDate);
  const [time, setReminderTime] = useState<string>(currentTime);
  const [note, setNote] = useState<string>('');
  console.log(day, time);
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
    if (validateFormData()) {
      addReminder({
        chatId,
        day,
        time,
        note
      });
    }
  };

  const onDateChange = (newDate: Date = new Date()) => {
    setReminderDate(newDate);
    const { fullDate, time: fullTime } = fromDateToReminderData(newDate);
    setReminderDay(fullDate);
    setReminderTime(fullTime);
  };

  const title = 'Create a reminder';

  const formHeader = (
    <h2 className={styles.header}>{title}</h2>
  );

  const dateInputFormGroup = (
    <Form.Group>
      <Form.Label htmlFor="date" className={styles.inputLabel}>
        When
      </Form.Label>
      <DateTimePicker
        id="date"
        name="date"
        onChange={onDateChange}
        value={date}
        disableClock
        required
        locale="en-GB"
        className={styles.dateTimePicker}
        clearIcon={null}
      />
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
        {dateInputFormGroup}
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
    toggleModal({ modalType: ModalTypes.SetReminder, show: false });
  };

  return (
    <ModalWindow
      isShown={isShown}
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
    modal: { setReminder }
  } = state;

  return {
    isShown: setReminder,
    chatId: state.chat?.chat?.id
  };
};

const mapDispatchToProps = {
  toggleModal: showModalRoutine,
  addReminder: addReminderRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomReminderModal);
