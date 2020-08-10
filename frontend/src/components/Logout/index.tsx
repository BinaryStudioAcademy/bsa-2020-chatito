import { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Routine } from 'redux-saga-routines';
import { history } from '../../common/helpers/historyHelper';
import { Routes } from '../../common/enums/Routes';
import { logoutUserRoutine } from '../../routines/user';
import { ITokens } from '../../common/models/ITokens';
import { setTokens } from '../../common/helpers/storageHelper';

interface IProps {
  logoutUser: Routine;
}

let logoutFunc: Routine;
export const LogoutBar: FunctionComponent<IProps> = ({ logoutUser }) => {
  logoutFunc = logoutUser;
  return (null);
};

const mapDispatchToProps = {
  logoutUser: logoutUserRoutine
};

export default connect(null, mapDispatchToProps)(LogoutBar);

export const logOut = () => {
  logoutFunc();
  const tokens: ITokens = { accessToken: '', refreshToken: '' };
  setTokens(tokens);
  history.push(Routes.SignIn);
};
