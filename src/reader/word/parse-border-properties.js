import JsFile from 'JsFile';
import prepareLineStyle from './prepare-line-style';
import normalizeSideValue from './normalize-side-value';
const {normalizeColorValue} = JsFile.Engine;

export default function parseBorderProperties (node) {
    const result = {};

    [].forEach.call(node && node.childNodes || [], ({localName, attributes}) => {
        localName = localName || '';
        const side = normalizeSideValue(localName);
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