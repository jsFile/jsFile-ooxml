const effectPatterns = {
    blinkBackground: 'blinkBackgroundAnimation',
    lights: 'lightsAnimation',
    antsBlack: 'blackDashedLineAnimation',
    antsRed: 'redDashedLineAnimation',
    shimmer: 'shimmerAnimation',
    sparkle: 'sparkleAnimation'
};

/**
 * @param node
 * @return {String}
 * @private
 */
export default function (node = {}) {
    let {attributes = {}} = node;

    return effectPatterns[attributes['w:val'] && attributes['w:val'].value] || 'none';
};