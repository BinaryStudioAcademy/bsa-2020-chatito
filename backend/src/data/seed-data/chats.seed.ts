import { ChatType } from '../../common/enums/ChatType';

export const chats = [
  {
    name: 'First chat (ws 1)',
    type: ChatType.Channel,
    isPrivate: false,
    createdByUser: '2',
    workspaceId: 1
  },
  {
    name: 'Second chat (ws 1)',
    type: ChatType.Channel,
    isPrivate: false,
    createdByUser: '3',
    workspaceId: 1
  },
  {
    name: 'Third chat (ws 1)',
    type: ChatType.Channel,
    isPrivate: true,
    createdByUser: '1',
    workspaceId: 1
  },
  {
    name: 'First chat (ws 2)',
    type: ChatType.Channel,
    isPrivate: false,
    createdByUser: '2',
    workspaceId: 2
  },
  {
    name: 'Second chat (ws 2)',
    type: ChatType.DirectMessage,
    isPrivate: true,
    createdByUser: '3',
    workspaceId: 2
  },
  {
    name: 'First chat (ws 3)',
    type: ChatType.Channel,
    isPrivate: false,
    createdByUser: '2',
    workspaceId: 3
  },
  {
    name: 'Second chat (ws 3)',
    type: ChatType.Channel,
    isPrivate: false,
    createdByUser: '4',
    workspaceId: 3
  },
  {
    name: 'Third chat (ws 3)',
    type: ChatType.Channel,
    isPrivate: true,
    createdByUser: '5',
    workspaceId: 3
  },
  {
    name: 'Fourth chat (ws 3)',
    type: ChatType.Channel,
    isPrivate: false,
    createdByUser: '1',
    workspaceId: 3
  },
  {
    name: 'First chat (ws 4)',
    type: ChatType.Channel,
    isPrivate: false,
    createdByUser: '2',
    workspaceId: 4
  },
  {
    name: 'Second chat (ws 4)',
    type: ChatType.DirectMessage,
    isPrivate: true,
    createdByUser: '1',
    workspaceId: 4
  },
  {
    name: 'Third chat (ws 4)',
    type: ChatType.Channel,
    isPrivate: true,
    createdByUser: '2',
    workspaceId: 4
  },
  {
    name: 'Fourth chat (ws 4)',
    type: ChatType.Channel,
    isPrivate: false,
    createdByUser: '4',
    workspaceId: 4
  },
  {
    name: 'Fifth chat (ws 4)',
    type: ChatType.Channel,
    isPrivate: false,
    createdByUser: '3',
    workspaceId: 4
  }
];
