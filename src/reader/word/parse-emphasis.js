const values = {
    dot: 'dotted',
    comma: 'comma',
    circle: 'circle',
    underDot: 'underDotted'
};

/**
 *
 * @param attribute
 * @returns {string}
 */
export default function parseEmphasis (attribute) {
    return (attribute && values[attribute.value]) || '';
}