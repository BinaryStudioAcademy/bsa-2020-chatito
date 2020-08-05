const tokenFieldName = 'token';

const setAccessToken = (token: string): void => localStorage.setItem(tokenFieldName, token);

const getAccessToken = (): string | null => localStorage.getItem(tokenFieldName);

export { setAccessToken, getAccessToken };
