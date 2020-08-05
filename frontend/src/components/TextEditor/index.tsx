import styles from './styles.module.sass';
import React, { FunctionComponent } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { env } from '../../env';
import Button from 'react-bootstrap/Button';

interface IProps{
  placeholder: string;
  height: number | 'auto';
  width: number | 'auto';
  onSend: () => any;
}

const App: FunctionComponent<IProps> = ({ placeholder, width, height, onSend }) => {
  const handleEditorChange = (content: string, editor: any) => {
    console.log(content);
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
        onEditorChange={handleEditorChange}
      />

      <Button variant="secondary" onClick={onSend}>Send</Button>
    </div>

  );
};

export default App;
