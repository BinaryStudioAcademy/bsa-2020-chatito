const setLocalStorageItem = (key: string, value: string): void => localStorage.setItem(key, value);

const getLocalStorageItem = (key:string): string | null => localStorage.getItem(key);

export { setLocalStorageItem, getLocalStorageItem };
