"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCamelString = exports.toSnakeString = exports.keysToSnake = exports.keysToCamel = exports.isObject = exports.isArray = exports.toCamel = void 0;
const lodash_1 = __importDefault(require("lodash"));
const toCamel = (s) => {
    return s.replace(/([-_][a-z])/gi, ($1) => {
        return $1.toUpperCase().replace("-", "").replace("_", "");
    });
};
exports.toCamel = toCamel;
const isArray = (a) => {
    return Array.isArray(a);
};
exports.isArray = isArray;
const isObject = (o) => {
    return o === Object(o) && !(0, exports.isArray)(o) && typeof o !== "function";
};
exports.isObject = isObject;
const keysToCamel = (o) => {
    if ((0, exports.isObject)(o)) {
        const n = {};
        Object.keys(o).forEach((k) => {
            n[(0, exports.toCamel)(k)] = o[k];
        });
        return n;
    }
    else if ((0, exports.isArray)(o)) {
        return o.map((i) => {
            return (0, exports.keysToCamel)(i);
        });
    }
    return o;
};
exports.keysToCamel = keysToCamel;
const keysToSnake = (o) => {
    if ((0, exports.isObject)(o)) {
        const n = {};
        Object.keys(o).forEach((k) => {
            n[lodash_1.default.snakeCase(k)] = o[k];
        });
        return n;
    }
    else if ((0, exports.isArray)(o)) {
        return o.map((i) => {
            return lodash_1.default.snakeCase(i);
        });
    }
    return o;
};
exports.keysToSnake = keysToSnake;
const toSnakeString = (e) => {
    return e
        .match(/([A-Z])/g)
        .reduce((str, c) => str.replace(new RegExp(c), "_" + c.toLowerCase()), e)
        .substring(e.slice(0, 1).match(/([A-Z])/g) ? 1 : 0);
};
exports.toSnakeString = toSnakeString;
const toCamelString = (e) => {
    return e.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
};
exports.toCamelString = toCamelString;
//# sourceMappingURL=convertSnakeToCamel.js.map