import JsFile from 'JsFile';
import prepareLineStyle from './prepareLineStyle';
import normalizeSideValue from './normalizeSideValue';
const {dom: $} = JsFile;
const {normalizeColorValue} = JsFile.Engine;

export default function (node) {
    const result = {};

    $.children(node).forEach(({localName, attributes}) => {
        localName = localName || '';
        const side = this.normalizeSideValue(localName);
        const color = attributes['w:color'] && attributes['w:color'].value;
        const style = prepareLineStyle(attributes['w:val'] && attributes['w:val'].value);
        const width = attributes['w:sz'] && attributes['w:sz'].value || 0;

        if (side && color) {
            let borderName = 'border' + side;
            result[borderName + 'Color'] = normalizeColorValue(color);
            result[borderName + 'Style'] = style;
            result[borderName + 'Width'] = {
                value: width / 8,
                unit: 'pt'
            };
        }
    }, this);

    return result;
}