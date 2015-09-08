import $ from './../../../../core/dom/index';
import merge from './../../../../core/jdoc/helpers/merge';
import attributeToBoolean from './../../../../core/engine/src/attributeToBoolean';
import normalizeColorValue from './../../../../core/engine/src/normalizeColorValue';
import normalizeVerticalAlign from './../../../../core/engine/src/normalizeVerticalAlign';
import prepareLineStyle from './prepareLineStyle';
import parseTextProperties from './parseTextProperties';
import normalizeLineHeight from './normalizeLineHeight';
import parseBorderProperties from './parseBorderProperties';

const alignmentValues = ['left', 'right', 'center'];

export default function (node, documentData) {
    let result = {
        style: {}
    };

    $.children(node).forEach(node => {
        let attrValue,
            localName = node.localName;

        switch(localName) {
            case 'framePr':
                // TODO: handle Text Frame properties
                break;
            case 'ind':
                attrValue = node.attributes['w:left'] && node.attributes['w:left'].value;
                if (!isNaN(attrValue)) {
                    result.style.paddingLeft = {
                        unit: 'pt',
                        value: attrValue / 20
                    };
                }

                attrValue = node.attributes['w:right'] && node.attributes['w:right'].value;
                if (!isNaN(attrValue)) {
                    result.style.paddingRight = {
                        unit: 'pt',
                        value: attrValue / 20
                    };
                }

                attrValue = node.attributes['w:firstLine'] && node.attributes['w:firstLine'].value;
                if (!isNaN(attrValue)) {
                    result.style.textIndent = result.style.textIndent || {
                        unit: 'pt',
                        value: 0
                    };
                    result.style.textIndent.value += attrValue / 20;
                }
                break;
            case 'jc':
                attrValue = node.attributes['w:val'] && node.attributes['w:val'].value;

                if (attrValue === 'both') {
                    result.style.textAlign = 'justify';
                } else if (alignmentValues.indexOf(attrValue) >= 0) {
                    result.style.textAlign = attrValue;
                }
                break;
            case 'keepNext':
            case 'keepLines':
                result[localName] = true;
                break;
            case 'numPr':
                const {attributes: idAttrs} = node.querySelector('numId') || {};
                const {attributes: levelAttrs} = node.querySelector('ilvl') || {};
                const id = idAttrs && idAttrs['w:val'] && idAttrs['w:val'].value;
                const level = levelAttrs && levelAttrs['w:val'] && levelAttrs['w:val'].value;

                result.numbering = {
                    id: !isNaN(id) ? Number(id) : 0,
                    level: !isNaN(level) ? Number(level) : 0
                };
                break;
            case 'outlineLvl':
                attrValue = node.attributes['w:val'] && node.attributes['w:val'].value;
                result.outlineLevel = !isNaN(attrValue) ? Number(attrValue) : 0;
                break;
            case 'pBdr':
                merge(result.style, parseBorderProperties(node));
                break;
            case 'pStyle':
                attrValue = node.attributes['w:val'] && node.attributes['w:val'].value;
                let usedStyleData = attrValue && documentData && documentData.styles &&
                    documentData.styles.usedStyles && documentData.styles.usedStyles[attrValue];

                result.styleId = attrValue;
                if (usedStyleData) {
                    const headingInfo = (/Heading\s*([0-9]+)/i).exec(usedStyleData.name);

                    if (headingInfo) {
                        result.heading = {
                            level: isNaN(headingInfo[1]) ? 0 : Number(headingInfo[1])
                        };
                    } else if ((/List\s*Paragraph/i).test(usedStyleData.name)) {
                        result.isListItem = true;
                    }

                    result.textProperties = merge(result.textProperties, usedStyleData.textProperties);
                    result = merge(result, usedStyleData.paragraphProperties);
                }
                break;
            case 'rPr':
                result.textProperties = merge(result.textProperties, parseTextProperties(node, documentData));
                break;
            case 'shd':
                attrValue = node.attributes['w:fill'] && node.attributes['w:fill'].value;
                if (attrValue) {
                    result.style.backgroundColor = normalizeColorValue(node);
                }
                break;
            case 'spacing':
                attrValue = node.attributes['w:line'] && node.attributes['w:line'].value;
                if (!isNaN(attrValue)) {
                    result.style.lineHeight = normalizeLineHeight(attrValue);

                    /**
                     * @description Fix for empty container
                     * @type {String}
                     */
                    result.style.minHeight = {
                        value: attrValue / 20,
                        unit: 'pt'
                    };
                }

                attrValue = node.attributes['w:before'] && node.attributes['w:before'].value;
                if (!isNaN(attrValue)) {
                    result.style.marginTop = {
                        value: attrValue / 20,
                        unit: 'pt'
                    };
                }

                attrValue = node.attributes['w:after'] && node.attributes['w:after'].value;
                if (!isNaN(attrValue)) {
                    result.style.marginBottom = {
                        value: attrValue / 20,
                        unit: 'pt'
                    };
                }
                break;
            case 'tabs':
                let value = 0;
                $.children(node).forEach((node) => {
                    const attrValue = node.attributes['w:pos'] && node.attributes['w:pos'].value;
                    value += isNaN(attrValue) ? 0 : Number(attrValue);
                });

                if (value) {
                    result.style.textIndent = result.style.textIndent || {
                        value: 0,
                        unit: 'pt'
                    };

                    result.style.textIndent.value += value / 20;
                }
                break;
            case 'textAlignment':
                attrValue = node.attributes['w:val'] && node.attributes['w:val'].value;
                result.style.verticalAlign = normalizeVerticalAlign(attrValue);
                break;
        }
    });

    return result;
}