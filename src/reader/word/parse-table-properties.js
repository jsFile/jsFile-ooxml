import JsFile from 'JsFile';
import parseBorderProperties from './parse-border-properties';
import normalizeSideValue from './normalize-side-value';
const {merge, normalizeColorValue, formatPropertyName, cropUnit} = JsFile.Engine;

export default function parseTableProperties (node) {
    const result = {
        properties: {},
        style: {}
    };
    const forEach = [].forEach;

    // eslint-disable-next-line complexity
    forEach.call(node && node.childNodes || [], (node) => {
        let attrValue;
        let type;
        const {attributes, localName} = node;

        switch (localName) {
            case 'jc':
                attrValue = normalizeSideValue(attributes['w:val'] && attributes['w:val'].value);
                if (attrValue === 'left' || attrValue === 'right') {
                    result.style.float = attrValue;
                }

                break;
            case 'shd':
                attrValue = attributes['w:fill'] && attributes['w:fill'].value;
                if (attrValue) {
                    result.style.backgroundColor = normalizeColorValue(node);
                }

                break;
            case 'tblBorders':
                {
                    if (!result.style.borderSpacing) {
                        result.style.borderCollapse = 'collapse';
                    }

                    merge(result.style, parseBorderProperties(node));
                    const horizontalBorder = node.querySelector('insideH');
                    const verticalBorder = node.querySelector('insideV');

                    if (horizontalBorder || verticalBorder) {
                        result.colProperties = result.colProperties || {style: {}};

                        if (horizontalBorder) {
                            merge(result.colProperties.style, parseBorderProperties(horizontalBorder));
                        }

                        if (verticalBorder) {
                            merge(result.colProperties.style, parseBorderProperties(verticalBorder));
                        }
                    }

                    break;
                }
            case 'tblCaption':
                attrValue = attributes['w:val'] && attributes['w:val'].value;
                if (attrValue) {
                    result.caption = attrValue;
                }

                break;
            case 'tblCellMar':
                result.colProperties = result.colProperties || {style: {}};

                forEach.call(node && node.childNodes || [], (node) => {
                    const side = formatPropertyName(normalizeSideValue(node.localName), {
                        capitalize: true
                    });

                    attrValue = Number(attributes['w:w'] && attributes['w:w'].value);
                    if (attrValue && !isNaN(attrValue) && side) {
                        type = attributes['w:type'] && attributes['w:type'].value;
                        result.colProperties.style[`padding${ side }`] = {
                            unit: 'pt',
                            value: attrValue / (type === 'nil' ? 1 : 20)
                        };
                    }
                });

                break;
            case 'tblCellSpacing':
                attrValue = Number(attributes['w:w'] && attributes['w:w'].value);
                if (attrValue && !isNaN(attrValue)) {
                    type = attributes['w:type'] && attributes['w:type'].value;
                    delete result.style.borderCollapse;

                    result.style.borderSpacing = {
                        unit: 'pt',
                        value: attrValue / (type === 'nil' ? 1 : 20)
                    };
                }

                break;
            case 'tblInd':
                attrValue = Number(attributes['w:w'] && attributes['w:w'].value);
                if (attrValue && !isNaN(attrValue)) {
                    type = attributes['w:type'] && attributes['w:type'].value;

                    if (!result.style.marginLeft) {
                        result.style.marginLeft = {
                            value: 0,
                            unit: 'pt'
                        };
                    }

                    result.style.marginLeft.value += attrValue / (type === 'nil' ? 1 : 20);
                }

                break;
            case 'tblLayout':
                attrValue = attributes['w:type'] && attributes['w:type'].value;
                if (attrValue === 'fixed') {
                    result.style.tableLayout = 'fixed';
                }

                break;

            // TODO: handle tblLook, tblOverlap, tblpPr
            case 'tblStyle':
                attrValue = attributes['w:val'] && attributes['w:val'].value;
                if (result.properties.className) {
                    attrValue = ` ${ attrValue }`;
                } else {
                    result.properties.className = '';
                }

                result.properties.className += attrValue;
                break;
            case 'tblStyleColBandSize':
                result.colBindSize = Number(attributes['w:val'] && attributes['w:val'].value);
                break;
            case 'tblStyleRowBandSize':
                result.rowBindSize = Number(attributes['w:val'] && attributes['w:val'].value);
                break;
            case 'tblW':
                attrValue = attributes['w:w'] && attributes['w:w'].value;
                if (attrValue) {
                    type = attributes['w:type'] && attributes['w:type'].value;
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

            default:
                // do nothing
        }
    });

    return result;
}