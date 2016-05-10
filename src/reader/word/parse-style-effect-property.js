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
export default function parseStyleEffectProperty (node = {}) {
    const {attributes = {}} = node;

    return effectPatterns[attributes['w:val'] && attributes['w:val'].value] || 'none';
}