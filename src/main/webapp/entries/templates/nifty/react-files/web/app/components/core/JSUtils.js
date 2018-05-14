
const _ = require("underscore")

export const isEmpty = (object) => {
    return _.isNull(object) || _.isUndefined(object) || _.isEmpty(object);
}

export const isNotEmpty = (object) => {
    return !(_.isNull(object) || _.isUndefined(object) || _.isEmpty(object));
}
