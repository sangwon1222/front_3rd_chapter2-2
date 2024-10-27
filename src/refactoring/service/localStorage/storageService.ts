export const getLocalStorageItem = (key: string, defaultValue: any) => {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch (e) {
    console.error('Error accessing localStorage:', e);
    return defaultValue;
  }
};

export const setLocalStorageItem = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Error accessing localStorage:', e);
  }
};
