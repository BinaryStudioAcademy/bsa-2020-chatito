import React from 'react';
import styles from './styles.module.sass';
import { getCurrentDateData, fromDateToReminderData } from 'containers/CustomReminderModal';
import { addReminderRoutine } from 'scenes/Chat/routines';
import { ICreateReminder } from 'common/models/reminder/ICreateReminder';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { connect } from 'react-redux';
import { IAppState } from 'common/models/store';

interface IProps {
  text: string;
  addedTime: number;
  addReminder: IBindingCallback1<ICreateReminder>;
  chatId?: string;
}

const ReminderItem = ({ text, addedTime, addReminder, chatId }: IProps) => (
  <button
    type="button"
    className={styles.optionsSelect}
    onClick={() => {
      const { currentDate } = getCurrentDateData();
      const newDate = new Date(currentDate.getTime() + addedTime);
      const { fullDate, time } = fromDateToReminderData(newDate);
      addReminder({ day: fullDate, time, note: '', chatId });
    }}
  >
    <span>{text}</span>
  </button>
);

const mapStateToProps = (state: IAppState) => (
  {
    chatId: state?.chat?.chat?.id
  }
);

const mapDispatchToProps = {
  addReminder: addReminderRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ReminderItem);
