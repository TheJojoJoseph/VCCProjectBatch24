import qs from 'qs';

export const parseWebUrl = (param = window.location.search) => {
  const parsed = qs.parse(fixQuestionMark(param), {
    arrayLimit: 1000,
  });
  return parsed;
};

export const parseUrl = (queryString) => {
  const parsed = qs.parse(queryString, {
    arrayLimit: 1000,
  });
  return parsed;
};

export const makeUrl = (param) => {
  const url = qs.stringify(param);
  return url;
};

const fixQuestionMark = (param) => {
  if (param.startsWith('?')) return param.substr(1);
  return param;
};

export function makeUrlString(param) {
  return '?' + makeUrl(param);
}

export function getIndexRoute() {
  const arr = window.location.href.split('/');
  return arr[arr.length - 1];
}