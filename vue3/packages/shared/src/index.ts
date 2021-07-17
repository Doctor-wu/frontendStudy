export const isObject = (value) => typeof value === 'object' && value !== null;
export const extend = Object.assign;


const Shared = {
  isObject,
};

export {
  Shared,
};
