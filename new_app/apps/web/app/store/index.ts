export const getLocalStorage = (key: string) => {
  const savedData = localStorage.getItem(key);
  if (savedData) {
    const result = JSON.parse(savedData);
    const realTime = new Date().getTime();
    if (realTime > result.expiryTime) {
      localStorage.removeItem(key);
      return null;
    }
    return result;
  }
  return null;
};
export const setLocalStorage = (key: string, value: any, expiresIn: any) => {
  const expiryTime = new Date().getTime() + expiresIn * 1000;
  const tokenData = {
    value,
    expiryTime,
  };
  localStorage.setItem(key, JSON.stringify(tokenData));
};
export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
