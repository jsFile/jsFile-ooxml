/**
 * @description 240 => 1, 360 => 1.5
 * @return {Number}
 * @private
 */
export default function normalizeLineHeight (value) {
    const result = Math.round(value / 240 * 100) / 100;

    return (isNaN(result) || result < 1) ? 1 : result;
}