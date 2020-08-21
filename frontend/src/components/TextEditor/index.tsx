import React, { FunctionComponent } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import debounce from 'debounce';
import { env } from 'env';
import styles from './styles.module.sass';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { IDraftPost } from 'common/models/draft/IDraftPost';
import { IUpsertDraftPost } from 'common/models/draft/IUpsertDraftPost';
import { IUpsertDraftComment } from 'common/models/draft/IUpsertDraftComment';
import { IDraftComment } from 'common/models/draft/IDraftComment';
import { IDeleteDraftPost } from 'common/models/draft/IDeleteDraftPost';
import { IDeleteDraftComment } from 'common/models/draft/IDeleteDraftComment';

interface IProps {
  placeholder: string;
  height: number | string | 'auto';
  draftPayload: IDeleteDraftPost | IDeleteDraftComment | any; // TODO: remove any, fix types
  draftInput: IDraftPost | IDraftComment;
  onSend: (text: string) => void;
  upsertDraft: IBindingCallback1<IUpsertDraftPost | IUpsertDraftComment | any>;
  deleteDraft: IBindingCallback1<IDeleteDraftPost | IDeleteDraftComment | any>;
}

const TextEditor: FunctionComponent<IProps> = ({
  placeholder,
  height,
  draftPayload,
  draftInput,
  onSend,
  upsertDraft,
  deleteDraft
}) => {
  const onSendMessage = (editor: any) => {
    const content = editor.getContent();
    if (content) {
      onSend(editor.getContent());
      editor.setContent('');
    }
  };

  const onInputChange = (editor: any) => {
    const inputText = editor.getContent();

    if (!inputText) {
      deleteDraft(draftPayload);
    } else {
      const payload = {
        ...draftPayload,
        id: draftInput.id ? draftInput.id : undefined,
        text: inputText
      };
      upsertDraft(payload);
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
            'undo redo | bold italic | bullist numlist | emoticons | myCustomToolbarButton',
          skin: 'naked',
          toolbar_location: 'bottom', // eslint-disable-line @typescript-eslint/camelcase

          setup: (editor: any) => {
            editor.ui.registry.addButton('myCustomToolbarButton', {
              icon: 'arrow-right',
              text: 'Send message',
              onAction: () => onSendMessage(editor)
            });

            editor.on('init', () => {
              editor.setContent(draftInput.text ? draftInput.text : '');
            });

            editor.on('keyup', debounce((event: KeyboardEvent) => {
              if (event.keyCode !== 13) {
                onInputChange(editor);
              }
            }, 1000));

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

export default TextEditor;
