import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import { IAppState } from '../../common/models/store';
import 'semantic-ui-css/semantic.min.css';
import css from './styles.module.css';
import triangle from './leftsideToolbar.data';
// import { createElement } from '../../common/helpers/domHelper';

// Все интерфейсы временные
interface IChanel {
  chanelname: string;
  private: boolean;
}

interface ILink {
  linkname: string;
  active: boolean;
}

interface IUser {
  username: string;
  chanels: IChanel[];
  links: ILink[];
}

interface IProps {
  user: IUser;
}

const LeftSideToolbar: React.FC<IProps> = ({ user }) => {
  const [chanelsView, setChanelsView] = useState(true);
  const [linksView, setLinksView] = useState(true);
  if (chanelsView) setChanelsView(false);
  if (linksView) setLinksView(false);

  const { username } = user;

  return (
    <div className={css.leftToolbar}>
      <button type="submit" className={css.topbutton}>
        <div className={css.toplefttext}>
          <span className={css.capletter}>B</span>
          <span className={css.toplogo}>
            inary Studio Academy
          </span>
          <div>
            <div className={css.metka} />
            {username}
          </div>
        </div>
        <div className={css.topiconbox}>
          <Icon name="edit" />
        </div>
        <div className={css.topinfo}>
          New Message
        </div>
      </button>
      <hr />
      <button type="submit" className={css.button}>
        <Icon name="podcast" />
        <span className={css.buttontext}>Threads</span>
      </button>
      <button type="submit" className={css.button}>
        <Icon name="at" />
        <span className={css.buttontext}>Mentions & reactions</span>
      </button>
      <button type="submit" className={css.button}>
        <Icon name="copy" />
        <span className={css.buttontext}>Drafts</span>
      </button>
      <button type="submit" className={css.button}>
        <Icon name="search" />
        <span className={css.buttontext}>Channel browser</span>
      </button>
      <button type="submit" className={css.button}>
        <Icon name="vcard" />
        <span className={css.buttontext}>People & user groups</span>
      </button>
      <button type="submit" className={css.button}>
        <Icon name="th" />
        <span className={css.buttontext}>Apps</span>
      </button>
      <button type="submit" className={css.button}>
        <Icon name="database" />
        <span className={css.buttontext}>File Browser</span>
      </button>
      <button type="submit" className={css.button}>
        <Icon name="reply" />
        <span className={css.buttontext}>Show less</span>
      </button>
      <hr />
      <button type="submit" className={css.button}>
        <img src={triangle} alt="treancl" />
        Text
      </button>

      <button type="submit" className={css.button}>
        <Icon name="hashtag" />
        Text
      </button>
      <button type="submit" className={css.button}>
        <Icon name="lock" />
        Text
      </button>

    </div>
  );
};

// Это тоже временный интерфейс
// Потом должен будет заменен на IAppState
export interface ITmptAppState extends IAppState { // eslint-disable-line
  currentuser: IUser;
}

const mapStateToProps = (state: ITmptAppState) => {
  const { currentuser } = state;
  return currentuser;
};

export default connect(mapStateToProps)(LeftSideToolbar);
