export const setSesionStorage = (key: string, value: any) => {
  sessionStorage.setItem(key, JSON.stringify(value));
}


export const getSesionStorage = (key: string) => {
  const value = sessionStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  }
  return null;
}


export enum SessionEnum {
  OSS_TOKEN = 'OSS_TOKEN',
}