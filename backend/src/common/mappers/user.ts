import PassportFacebookToken from 'passport-facebook-token';
import { IUserClient } from '../models/user/IUserClient';
import { IRegisterUser } from '../models/user/IRegisterUser';
import { ICreateUser } from '../models/user/ICreateUser';
import { User } from '../../data/entities/User';
import { IUserWithWorkspaces } from '../models/user/IUserWithWorkspaces';
import { fromCreatedWorkspaceToClient } from './workspace';
import { IGoogleUser } from '../models/user/IGoogleUser';
import { IFacebookUser } from '../models/user/IFacebookUser';
import { IUser } from '../models/user/IUser';
import { getImageUrl } from '../utils/imageHelper';

export const fromUserToUserClient = (user: IUserWithWorkspaces | IUser): IUserClient => {
  const {
    id,
    fullName,
    displayName,
    email,
    imageUrl,
    title,
    status,
    githubUsername,
    audio,
    incomingSoundOptions
  } = user;
  return {
    id,
    fullName,
    email,
    displayName,
    imageUrl: getImageUrl(imageUrl),
    title,
    status,
    githubUsername,
    audio,
    incomingSoundOptions
  };
};

export const fromUserToUserWithWorkspaces = (user: User): IUserWithWorkspaces => {
  const { id,
    fullName,
    displayName,
    email,
    imageUrl,
    title,
    status,
    githubUsername,
    workspaces = [],
    audio,
    incomingSoundOptions
  } = user;
  return {
    id,
    fullName,
    email,
    displayName,
    imageUrl: getImageUrl(imageUrl),
    title,
    status,
    audio,
    githubUsername,
    incomingSoundOptions,
    workspaces: workspaces.map(workspace => fromCreatedWorkspaceToClient(workspace))
  };
};

export const fromRegisterUserToCreateUser = ({ fullName, email, password }: IRegisterUser): ICreateUser => ({
  fullName,
  email,
  password,
  displayName: fullName
});

export const fromGoogleUserToCreateUser = ({ name, email }: IGoogleUser): ICreateUser => ({
  fullName: name,
  email,
  password: null,
  displayName: name
});

export const fromFacebookProfileToFacebookUser = (facebookProfile: PassportFacebookToken.Profile): IFacebookUser => {
  const { displayName, name: { familyName, givenName }, emails, photos } = facebookProfile;
  return {
    displayName,
    fullName: `${givenName} ${familyName}`,
    email: emails[0].value,
    imageUrl: photos[0].value
  };
};

export const fromFacebookUserToCreateUser = ({ displayName, fullName, email }: IFacebookUser): ICreateUser => ({
  fullName,
  email,
  password: null,
  displayName
});
