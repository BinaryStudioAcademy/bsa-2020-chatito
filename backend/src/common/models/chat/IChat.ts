import { User } from '../../../data/entities/User';
import { Workspace } from '../../../data/entities/Workspace';
import { ChatType } from '../../enums/ChatType';
import { Post } from '../../../data/entities/Post';
import { DraftPost } from '../../../data/entities/DraftPost';

export interface IChat {
  id: string;
  name: string;
  type: ChatType;
  description?: string;
  isPrivate: boolean;
  workspace: Workspace;
  createdByUser: User;
  users: User[];
  hash: string;
  posts: Post[];
  draftPosts?: DraftPost[];
}
