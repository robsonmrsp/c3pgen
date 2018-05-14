import * as ErrorMessages from './errorMessages';

const _ = require("underscore")

export const required = (message) => {
  return {
    isValid: (value) => {
      return !(_.isNull(value) || _.isUndefined(value) || _.isEmpty(value));
    },
    message
  }
};

export const mustMatch = (field, fieldName) => {
  return (text, state) => {
    return state[field] === text ? null : ErrorMessages.mustMatch(fieldName);
  };
};

export const minLength = (length) => {
  return (text) => {
    return text.length >= length ? null : ErrorMessages.minLength(length);
  };
};
