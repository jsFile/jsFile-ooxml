import JsFile from 'JsFile';
import parseBorderProperties from './parse-border-properties';
import normalizeSideValue from './normalize-side-value';
const {merge, normalizeColorValue, formatPropertyName, cropUnit} = JsFile.Engine;
const verticalAlignValues = {
    bottom: 'bottom',
    top: 'top',
    center: 'middle'
};

export default function parseTableColProperties (node) {
    const result = {
        properties: {},
        style: {}
    };
    const forEach = [].forEach;

    // eslint-disable-next-line complexity
    forEach.call(node && node.childNodes || [], (node) => {
        let attrValue;
        const {localName, attributes} = node;

        switch (localName) {
            case 'gridSpan':
                attrValue = Number(attributes['w:val'] && attributes['w:val'].value);

                if (attrValue && !isNaN(attrValue)) {
                    result.properties.colSpan = attrValue;
                }

                break;

            // TODO: parse hideMark. Maybe as tr.display = none
            case 'noWrap':
                result.style.whiteSpace = 'nowrap';
                break;
            case 'shd':
                attrValue = attributes['w:fill'] && attributes['w:fill'].value;
                if (attrValue) {
                    result.style.backgroundColor = normalizeColorValue(node);
                }

                break;
            case 'tcBorders':
                {
                    merge(result.style, parseBorderProperties(node));
                    const horizontalBorder = node.querySelector('insideH');
                    const verticalBorder = node.querySelector('insideV');

                    if (horizontalBorder || verticalBorder) {
                        if (horizontalBorder) {
                            merge(result.style, parseBorderProperties(horizontalBorder));
                        }

                        if (verticalBorder) {
                            merge(result.style, parseBorderProperties(verticalBorder));
                        }
                    }

                    break;
                }

            // TODO: parse tcFitText
            case 'tcMar':
                forEach.call(node && node.childNodes || [], ({localName, attributes}) => {
                    const side = formatPropertyName(normalizeSideValue(localName));
                    const value = Number(attributes['w:w'] && attributes['w:w'].value);

                    if (value && !isNaN(value) && side) {
                        const type = attributes['w:type'] && attributes['w:type'].value;

                        result.style[`padding${ side }`] = {
                            unit: 'pt',
                            value: value / (type === 'nil' ? 1 : 20)
                        };
                    }
                });

                break;
            case 'tcW':
                attrValue = attributes['w:w'] && attributes['w:w'].value;
                if (attrValue) {
                    const type = attributes['w:type'] && attributes['w:type'].value;

                    result.style.width = {
                        unit: 'pt'
                    };

                    const isPercents = type === 'pct' || attrValue.indexOf('%') > 0;
                    let value = cropUnit(attrValue);

                    if (isPercents) {
                        result.style.width.unit = '%';
                        value /= 50;
                    } else if (!type || type !== 'nil') {
                        value /= 20;
                    }

                    result.style.width.value = value;
                }

                break;
            case 'vAlign':
                attrValue = attributes['w:val'] && verticalAlignValues[attributes['w:val'].value];
                if (attrValue) {
                    result.style.verticalAlign = attrValue;
                }

                break;

            default:
                // TODO: parse vMerge element
        }
    });

    return result;
}