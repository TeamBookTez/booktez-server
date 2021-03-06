import _ from "lodash";

export const toCamel = (s) => {
  return s.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace("-", "").replace("_", "");
  });
};

export const isArray = (a) => {
  return Array.isArray(a);
};

export const isObject = (o) => {
  return o === Object(o) && !isArray(o) && typeof o !== "function";
};

export const keysToCamel = (o) => {
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

export const keysToSnake = (o) => {
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

export const toSnakeString = (e) => {
  return e
    .match(/([A-Z])/g)
    .reduce((str, c) => str.replace(new RegExp(c), "_" + c.toLowerCase()), e)
    .substring(e.slice(0, 1).match(/([A-Z])/g) ? 1 : 0);
};

export const toCamelString = (e) => {
  return e.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
};
