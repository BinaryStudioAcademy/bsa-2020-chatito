import React, { FunctionComponent } from 'react';

import UserAvatar from '../UserLogo';
import styles from './styles.module.sass';
import { IUser } from '../../common/models/user';
import { getAmPmTimeFromDate } from '../../common/helpers/dateHelper';
// import { IPost } from '../../../../common/models/post/IPost';

interface IProps {
  user: IUser;
  text: string;
  sendedAt: Date;
}

// interface IProps {
//   post: IPost;
// }

const Post: FunctionComponent<IProps> = ({ user, text, sendedAt }) => (
  <div className={styles.postWrapper}>
    <div className={styles.left}>
      {user.imgUrl ? (
        <UserAvatar imgUrl={user.imgUrl} isOnline={user.isOnline} />
      ) : null}
    </div>
    <div className={styles.right}>
      <div>
        <span className={styles.username}>{user.fullname}</span>
        <span className={styles.time}>{getAmPmTimeFromDate(sendedAt)}</span>
      </div>
      <div className={styles.text}>{text}</div>
    </div>
  </div>
);

export default Post;

// export default function PostItem({ post }: IProps) {
//   const { createdByUser: author, text } = post;

//   return (
//     <div className={styles.postWrapper}>
//       <div className={styles.left}>
//         {author.imageUrl ? (
//           <UserAvatar imgUrl={author.imageUrl} isOnline />
//         ) : null}
//       </div>
//       <div className={styles.right}>
//         <div>
//           <span className={styles.username}>{author.fullName}</span>
//           <span className={styles.time}> 5:48 PM</span>
//         </div>
//         <div className={styles.text}>{text}</div>
//       </div>
//     </div>
//   )
// };
