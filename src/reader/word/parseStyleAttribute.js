import cropUnit from './../../../../core/engine/src/cropUnit';

/**
 *
 * @param params
 * @returns {*}
 */
export default function (params) {
    let styles = {},
        {value = '', denominator = 1} = params;

    String(value || '').split(';').forEach(function (rule) {
        let stylePartitionData = rule.split(':'),
            name = stylePartitionData[0],
            value = stylePartitionData[1] || '';

        if (name === 'width' || name === 'height' || name === 'left' || name === 'top') {
            styles[name] = {
                value: cropUnit(value.trim()) / denominator,
                unit: 'pt'
            };
        } else if (name === 'visibility' || name === 'position') {
            styles[name] = value.trim();
        }
    });

    return styles;
};