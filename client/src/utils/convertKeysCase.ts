import _ from "lodash";

export function convertKeysCase<T=object>(
  object: T,
  case_: "camel" | "snake"
): T {
  if (Array.isArray(object)) {
    return object.map((item) => convertKeysCase(item, case_)) as T;
  }

  if (typeof object === 'string') {
    return _[`${case_}Case`](object) as T;
  }

  if (!_.isNumber(object)) {
    const newObj = {};

    _.forEach(object as T[], (value, key) => {
      if (_.isObject(value)) {
        // @ts-ignore
        newObj[_[`${case_}Case`](key)] = convertKeysCase(value, case_);
      } else {
        // @ts-ignore
        newObj[_[`${case_}Case`](key)] = value;
      }
    });

    return newObj as T;
  }

  return object;
}
