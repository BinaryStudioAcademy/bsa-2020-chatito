import styles from './styles.module.sass';
import React, { FunctionComponent, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { env } from '../../env';
import Button from 'react-bootstrap/Button';

interface IProps{
  placeholder: string;
  height: number | 'auto';
  width: number | 'auto';
  onSend: (message: string) => void;
  onEdit?: (content: string) => {};
}

const App: FunctionComponent<IProps> = ({ placeholder, width, height, onSend, onEdit }) => {
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

  return (
    <div className={styles.wrapper} style={{ height, width }}>
      <Editor
        apiKey={env.apiKeys.textEditor}
        init={{
          placeholder,
          menubar: 'false',
          width: '100%',
          height: '100%',
          plugins: [
            'paste wordcount emoticons'
          ],
          toolbar:
            'undo redo | bold italic | bullist numlist | emoticons |'
        }}

        onEditorChange={onEditorChange}
      />

      <Button variant="secondary" onClick={onSendMessage}>Send</Button>
    </div>

  );
};

export default App;
