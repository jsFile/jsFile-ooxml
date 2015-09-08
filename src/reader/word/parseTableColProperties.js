import JsFile from 'JsFile';
import parseBorderProperties from './parseBorderProperties';
import normalizeSideValue from './normalizeSideValue';
const {dom: $} = JsFile;
const {merge, normalizeColorValue, formatPropertyName} = JsFile.Engine;

const verticalAlignValues = {
    bottom: 'bottom',
    top: 'top',
    center: 'middle'
};

export default function (node) {
    let result = {
        properties: {},
        style: {}
    };

    $.children(node).forEach((node) => {
        let attrValue;
        const {localName, attributes} = node;

        switch(localName) {
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
                merge(result.style, parseBorderProperties(node));

                let horizontalBorder = node.querySelector('insideH'),
                    verticalBorder = node.querySelector('insideV');

                if (horizontalBorder || verticalBorder) {
                    if (horizontalBorder) {
                        merge(result.style, parseBorderProperties(horizontalBorder));
                    }

                    if (verticalBorder) {
                        merge(result.style, parseBorderProperties(verticalBorder));
                    }
                }
                break;
            // TODO: parse tcFitText
            case 'tcMar':
                $.children(node).forEach(({localName, attributes}) => {
                    const side = formatPropertyName(normalizeSideValue(localName));
                    const value = Number(attributes['w:w'] && attributes['w:w'].value);

                    if (value && !isNaN(value) && side) {
                        const type = attributes['w:type'] && attributes['w:type'].value;
                        result.style['padding' + side] = {
                            unit: 'pt',
                            value: value / (type === 'nil' ? 1 : 20)
                        };
                    }
                });

                break;
            case 'tcW':
                attrValue = Number(attributes['w:w'] && attributes['w:w'].value);
                if (attrValue && !isNaN(attrValue)) {
                    const type = attributes['w:type'] && attributes['w:type'].value;
                    result.style.width = {
                        unit: 'pt'
                    };

                    if (type === 'pct') {
                        result.style.width.unit = '%';
                    } else if (!type || type !== 'nil') {
                        attrValue /= 20;
                    }

                    result.style.width.value = attrValue;
                }

                break;
            case 'vAlign':
                attrValue = attributes['w:val'] && verticalAlignValues[attributes['w:val'].value];
                if (attrValue) {
                    result.style.verticalAlign = attrValue;
                }
                break;
            // TODO: parse vMerge element
        }
    });

    return result;
}