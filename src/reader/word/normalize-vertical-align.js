const aligns = {
    superscript: 'top',
    subscript: 'bottom'
};

const defaultAlign = 'baseline';

/**
 *
 * @param value
 * @return {String}
 * @private
 */
export default (value) => value && aligns[String(value).toLowerCase()] || defaultAlign;