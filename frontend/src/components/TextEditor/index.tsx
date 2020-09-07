import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';
import debounce from 'debounce';
import { env } from 'env';
import styles from './styles.module.sass';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { IDraftPost } from 'common/models/draft/IDraftPost';
import { IDraftComment } from 'common/models/draft/IDraftComment';
import { updateActiveInputRoutine } from 'containers/Thread/routines';
import { InputType } from 'common/enums/InputType';
import { IActiveInput } from 'common/models/draft/IActiveInput';

interface IProps {
  placeholder: string;
  height: number | string | 'auto';
  draftInput: IDraftPost | IDraftComment;
  inputType: InputType.Post | InputType.Comment | null;
  onSend: (text: string) => void;
  onInputChange: (text: string) => void;
  updateActiveInput: IBindingCallback1<IActiveInput>;
}

const TextEditor: FunctionComponent<IProps> = ({
  placeholder,
  height,
  draftInput,
  inputType,
  onSend,
  onInputChange,
  updateActiveInput
}) => {
  const onSendMessage = (editor: any) => {
    const content = editor.getContent();
    if (content) {
      onSend(editor.getContent());
      editor.setContent('');
    }
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
            'bold italic | bullist numlist | emoticons | myCustomToolbarButton',
          skin: 'naked',
          toolbar_location: 'bottom', // eslint-disable-line @typescript-eslint/camelcase

          setup: (editor: any) => {
            editor.ui.registry.addButton('myCustomToolbarButton', {
              icon: 'arrow-right',
              text: 'Send message',
              onAction: () => onSendMessage(editor)
            });

            editor.on('init', () => {
              if (draftInput.text) {
                editor.setContent(draftInput.text);
              }
            });

            editor.on('focus', () => {
              updateActiveInput({ activeInput: inputType });
            });

            editor.on('blur', () => {
              updateActiveInput({ activeInput: null });
            });

            editor.on('keyup', debounce((event: KeyboardEvent) => {
              if (event.keyCode !== 13) {
                onInputChange(editor.getContent());
              }
            }, 500));

            editor.on('keydown', (event: KeyboardEvent) => {
              if (event.keyCode === 13) {
                event.preventDefault();
                onSendMessage(editor);
              }
            });
          }
        }}
      />
    </div>

  );
};

const mapDispatchToProps = {
  updateActiveInput: updateActiveInputRoutine
};

export default connect(null, mapDispatchToProps)(TextEditor);
