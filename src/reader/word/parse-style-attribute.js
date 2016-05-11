import JsFile from 'JsFile';
const {cropUnit} = JsFile.Engine;
const sides = ['width', 'height', 'left', 'top'];

/**
 *
 * @param params
 * @returns {*}
 */
export default function parseStyleAttribute (params) {
    const styles = {};
    const {value = '', denominator = 1} = params;

    String(value).split(';').forEach((rule) => {
        const stylePartitionData = rule.split(':');
        const name = stylePartitionData[0];
        const value = stylePartitionData[1] || '';

        if (sides.indexOf(name) >= 0) {
            styles[name] = {
                value: cropUnit(value.trim()) / denominator,
                unit: 'pt'
            };
        } else if (name === 'visibility' || name === 'position') {
            styles[name] = value.trim();
        }
    });

    return styles;
}