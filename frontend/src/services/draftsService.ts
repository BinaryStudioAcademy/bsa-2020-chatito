import api from 'common/helpers/apiHelper'; // eslint-disable-line
import { IDraftRequest } from 'common/models/draft/IDraftRequest'; // eslint-disable-line

export async function fetchDrafts() {
  // let response = await api.get('/api/draft');
  const response = Promise.resolve({
    posts: [
      {
        id: '0',
        text: 'draft0',
        chatId: '0'
      },
      {
        id: '1',
        text: 'draft1',
        chatId: '0'
      },
      {
        id: '2',
        text: 'draft2',
        chatId: '0'
      }
    ],
    comments: [
      {
        id: '4',
        text: 'draft4',
        chatId: '0'
      },
      {
        id: '5',
        text: 'draft5',
        chatId: '0'
      },
      {
        id: '6',
        text: 'draft6',
        chatId: '0'
      }
    ]
  });
  return response;
}
