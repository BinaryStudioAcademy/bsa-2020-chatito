import { LocalStorageFields } from '../enums/LocalStorageFields';

const setAccessToken = (token: string): void => localStorage.setItem(LocalStorageFields.Token, token);

const getAccessToken = (): string | null => localStorage.getItem(LocalStorageFields.Token);

export { setAccessToken, getAccessToken };
