import React from 'react';
import styles from './styles.module.sass';

import TextEditor from '../../components/TextEditor';

const ChatFooter = () => (
  <div className={styles.chat_footer}>
    <TextEditor
      placeholder=""
      height={120}
      onSend={() => { ''; }}
    />
  </div>
);

export default ChatFooter;
