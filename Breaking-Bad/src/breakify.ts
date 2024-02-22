import element from "./element";
const breakify = (str: string) => {
  const len = str.length;
  let res: string[] = [];

  for (let i = 0; i < len; i++) {
    const one = str[i].toUpperCase();
    const two = `${one}${str[i + 1]}`;

    if (element.includes(two)) {
      res = [str.slice(0, i), two, str.slice(i + 2, len)];
      break;
    }

    if (element.includes(one)) {
      res = [str.slice(0, i), one, str.slice(i + 1, len)];
      break;
    }
  }
  return res;
};

export default breakify;
