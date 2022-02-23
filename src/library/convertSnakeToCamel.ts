import _ from "lodash";

export const toCamel = (s) => {
  return s.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace("-", "").replace("_", "");
  });
};

export const isArray = function (a) {
  return Array.isArray(a);
};

export const isObject = function (o) {
  return o === Object(o) && !isArray(o) && typeof o !== "function";
};

export const keysToCamel = function (o) {
  if (isObject(o)) {
    const n = {};

    Object.keys(o).forEach((k) => {
      n[toCamel(k)] = o[k];
    });

    return n;
  } else if (isArray(o)) {
    return o.map((i) => {
      return keysToCamel(i);
    });
  }

  return o;
};

export const keysToSnake = function (o) {
  if (isObject(o)) {
    const n = {};

    Object.keys(o).forEach((k) => {
      n[_.snakeCase(k)] = o[k];
    });

    return n;
  } else if (isArray(o)) {
    return o.map((i) => {
      return _.snakeCase(i);
    });
  }

  return o;
};
