/* eslint-disable no-extend-native */
if (!String.prototype.includes) {
    String.prototype.includes = function (...args) {
        return String.prototype.indexOf.apply(this, args) !== -1;
    };
}

/* eslint-enable no-extend-native */

export default {};