import styles from './styles.module.sass';
import React, { FunctionComponent, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { env } from '../../env';
import Button from 'react-bootstrap/Button';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IProps {
  placeholder: string;
  height: number | 'auto';
  onSend: (message: string) => void;
  onEdit?: (content: string) => {};
}

const TextEditor: FunctionComponent<IProps> = ({ placeholder, height, onSend, onEdit }) => {
  const [message, setMessage] = useState('');

  const onEditorChange = (content: string, editor: any) => {
    setMessage(content);

    if (onEdit) {
      onEdit(content);
    }
  };

  const onSendMessage = () => {
    onSend(message);
  };

  const stylesObject = {

  };

  return (
    <div className={styles.wrapper} style={{ height }}>
      <Editor
        apiKey={env.apiKeys.textEditor}
        init={{
          placeholder,
          menubar: false,
          width: '100%',
          height: '100%',
          statusbar: false,
          contextmenu: false,
          plugins: [
            'paste wordcount emoticons'
          ],
          toolbar:
            'undo redo | bold italic | bullist numlist | emoticons | myCustomToolbarButton',
          skin: 'naked',
          toolbar_location: 'bottom', // eslint-disable-line @typescript-eslint/camelcase
          setup: (editor: any) => {
            editor.ui.registry.addButton('myCustomToolbarButton', {
              icon: 'arrow-right',
              text: 'Send message',
              onAction: () => onSendMessage()
            });
          }

        }}

        onEditorChange={onEditorChange}
      />
    </div>

  );
};

export default TextEditor;
