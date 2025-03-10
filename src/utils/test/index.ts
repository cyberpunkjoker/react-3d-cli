export const sum = (a: UncertainNumberType, b: UncertainNumberType): number | null => {
  if (
    [null, undefined].includes(a) ||
    [null, undefined].includes(b)
  ) {
    return null
  }

  const num = Number(a) + Number(b)

  if (isNaN(num)) {
    return null
  }

  return num
}

//  localStorage 测试
const set = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

const get = (key: string) => {
  return localStorage.getItem(key);
};

export const storage = {
  get, set
}

export const getSearchObj = () => {
  const { search } = window.location;

  const searchStr = search.slice(1);

  const pairs = searchStr.split("&");

  const searchObj: Record<string, string> = {};

  pairs.forEach((pair) => {
    const [key, value] = pair.split("=");
    searchObj[key] = value;
  });

  return searchObj;
};