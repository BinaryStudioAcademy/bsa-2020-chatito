import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import { IAppState } from '../../common/models/store';
import 'semantic-ui-css/semantic.min.css';
import css from './styles.module.css';
import triangle from './leftsideToolbar.data';

// Все интерфейсы временные
interface IChanel {
  chanelname: string;
  privat: boolean;
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

const chanelButton = (item: IChanel, index: number) => {
  const { chanelname, privat } = item;
  return (
    <button key={`cB${index}`} type="submit" className={css.button}>
      <Icon name={
        privat
          ? 'lock'
          : 'hashtag'
        }
      />
      <span className={css.buttontext}>{chanelname}</span>
    </button>
  );
};

const linkButton = (item: ILink, index: number) => {
  const { linkname, active } = item;
  return (
    <button key={`cB${index}`} type="submit" className={css.button}>
      <div className={
        active
          ? css.metkaOnLine
          : css.metkaOfLine
        }
      />
      <span className={css.buttontext}>{linkname}</span>
    </button>
  );
};

interface IState {
  linkPanel: boolean;
  directPanel: boolean;
}

const itemCurrent = 'currentState';

const loadCurrentState = (): IState => {
  try {
    const data = sessionStorage.getItem(itemCurrent);
    if (data) {
      return JSON.parse(data);
    }
    return { linkPanel: false, directPanel: false };
  } catch {
    return { linkPanel: false, directPanel: false };
  }
};

export const saveCurrentState = (data: IState) => {
  try {
    const usData = JSON.stringify(data);
    sessionStorage.setItem(itemCurrent, usData);
  } catch {
    // ignore write errors
  }
};

const LeftSideToolbar: React.FC<IProps> = ({ user }) => {
  const { username } = user;

  let { linkPanel, directPanel } = loadCurrentState();
  const getClassNameDiv = (state: boolean) => (
    state
      ? css.listboxHidden
      : css.listbox
  );
  const getClassNameDivDefault = (state: boolean) => (
    state
      ? css.listboxHiddenDeff
      : css.listboxDeff
  );
  const getClassNameImg = (state: boolean) => (
    state
      ? css.chanelsImgRotate
      : css.chanelsImg
  );

  const changeListView = () => {
    linkPanel = !linkPanel;
    const element = document.getElementById('divChanel') as HTMLElement;
    element.className = getClassNameDiv(linkPanel);
    const imgs = document.getElementById('imgChanel') as HTMLElement;
    imgs.className = getClassNameImg(linkPanel);
    saveCurrentState({ linkPanel, directPanel });
  };

  const changeDirectView = () => {
    directPanel = !directPanel;
    const element = document.getElementById('divDirect') as HTMLElement;
    element.className = getClassNameDiv(directPanel);
    const imgs = document.getElementById('imgDirect') as HTMLElement;
    imgs.className = getClassNameImg(directPanel);
    saveCurrentState({ linkPanel, directPanel });
  };

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
      <button type="submit" className={css.buttonChanel}>
        <button type="submit" className={css.buttonSelect} onClick={changeListView}>
          <img id="imgChanel" src={triangle} alt="treancl" className={getClassNameImg(linkPanel)} />
          <span className={css.buttontext}>Chanels</span>
        </button>
        <div className={css.buttonPlus}>
          <Icon name="plus" />
        </div>
        <div className={css.chanelinfo}>
          Create New Chanel
        </div>
      </button>
      <div id="divChanel" className={getClassNameDivDefault(linkPanel)}>
        {user.chanels.map((item, index) => (
          chanelButton(item, index)))}
      </div>
      <hr />
      <button type="submit" className={css.buttonChanel}>
        <button type="submit" className={css.buttonSelect} onClick={changeDirectView}>
          <img id="imgDirect" src={triangle} alt="treancl" className={getClassNameImg(directPanel)} />
          <span className={css.buttontext}>Direct Messages</span>
        </button>
        <div className={`${css.buttonPlus} ${css.buttonLink}`}>
          <Icon name="plus" />
        </div>
        <div className={css.directinfo}>
          Open a direct message
          <br />
          Ctrl + Shift + K
        </div>
      </button>
      <div id="divDirect" className={getClassNameDivDefault(directPanel)}>
        {user.links.map((item, index) => (
          linkButton(item, index)))}
      </div>
      <hr />
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
