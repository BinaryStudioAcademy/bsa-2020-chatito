import React from 'react';
import styles from './styles.module.sass';

const NoDraftsMessage = () => (
  <div className={styles.messageBody}>
    <h3>This is your drafts page</h3>
    <p>
      Whenever you start typing a message and don`t send it, it is saved to drafts.
      From this page you can go to you drafts chats and continue working with them
    </p>

    <p className={styles.paraghBold}>
      If you wanna see it in action, start typing text in any chat and return to this page
    </p>

  </div>
);

export default NoDraftsMessage;
