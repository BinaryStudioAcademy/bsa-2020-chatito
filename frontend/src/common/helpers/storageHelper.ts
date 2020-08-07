import { LocalStorageFields } from '../enums/LocalStorageFields';
import { ITokens } from '../models/ITokens';

const setAccessToken = (token: string): void => localStorage.setItem(LocalStorageFields.accessToken, token);

const getAccessToken = (): string | null => localStorage.getItem(LocalStorageFields.accessToken);

const setRefreshToken = (refreshToken: string) => localStorage.setItem(LocalStorageFields.refreshToken, refreshToken);

const getRefreshToken = () => localStorage.getItem(LocalStorageFields.refreshToken);

const setTokens = (tokens: ITokens) => {
  setAccessToken(tokens.accessToken);
  setRefreshToken(tokens.refreshToken);
};

export { setAccessToken, getAccessToken, setRefreshToken, getRefreshToken, setTokens };
