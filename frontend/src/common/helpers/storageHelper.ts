import { LocalStorageFields } from '../enums/LocalStorageFields';
import { ITokens } from '../models/ITokens';

export const setAccessToken = (token: string): void => localStorage.setItem(LocalStorageFields.AccessToken, token);

export const getAccessToken = (): string | null => localStorage.getItem(LocalStorageFields.AccessToken);

export const setRefreshToken = (refreshToken: string) => localStorage.setItem(
  LocalStorageFields.RefreshToken,
  refreshToken
);

export const getRefreshToken = () => localStorage.getItem(LocalStorageFields.RefreshToken);

export const setTokens = (tokens: ITokens) => {
  setAccessToken(tokens.accessToken);
  setRefreshToken(tokens.refreshToken);
};

export const clearStorage = (): void => localStorage.clear();
