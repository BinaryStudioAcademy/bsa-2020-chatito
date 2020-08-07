import { LocalStorageFields } from '../enums/LocalStorageFields';
import { ITokens } from '../models/ITokens';

const setAccessToken = (token: string): void => localStorage.setItem(LocalStorageFields.AccessToken, token);

const getAccessToken = (): string | null => localStorage.getItem(LocalStorageFields.AccessToken);

const setRefreshToken = (refreshToken: string) => localStorage.setItem(LocalStorageFields.RefreshToken, refreshToken);

const getRefreshToken = () => localStorage.getItem(LocalStorageFields.RefreshToken);

const setTokens = (tokens: ITokens) => {
  setAccessToken(tokens.accessToken);
  setRefreshToken(tokens.refreshToken);
};

export { setAccessToken, getAccessToken, setRefreshToken, getRefreshToken, setTokens };
