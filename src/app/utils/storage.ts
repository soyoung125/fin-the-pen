export const getLocalStorage = <T>(key: string, initialValue: T): T => {
  const item = localStorage.getItem(key);

  return item ? (JSON.parse(item) as T) : initialValue;
};

export const setLocalStorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getSessionStorage = <T>(key: string, initialValue: T): T => {
  const item = sessionStorage.getItem(key);

  return item ? (JSON.parse(item) as T) : initialValue;
};

export const setSessionStorage = <T>(key: string, value: T) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const getCookie = (name: string): string | undefined => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
};

export const setCookie = (name: string, value?: string) => {
  if (value) {
    document.cookie = name + "=" + value + ";"; //max-age=600
  }
};

export const deleteCookie = (names: string[]) => {
  names.forEach((name) => (document.cookie = name + "=;max-age=0"));
};
