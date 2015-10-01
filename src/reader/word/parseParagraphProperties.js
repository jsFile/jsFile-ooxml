import JsFile from 'JsFile';
import prepareLineStyle from './prepareLineStyle';
import parseTextProperties from './parseTextProperties';
import normalizeLineHeight from './normalizeLineHeight';
import parseBorderProperties from './parseBorderProperties';
const {merge, normalizeColorValue} = JsFile.Engine;
const alignmentValues = ['left', 'right', 'center'];

export default function (node, documentData) {
    let result = {
        style: {},
        properties: {
            textProperties: {
                properties: {}
            }
        }
    };
    const forEach = [].forEach;

    forEach.call(node && node.childNodes || [], (node) => {
        let attrValue;
        const localName = node.localName;

        switch (localName) {
            case 'ind':
                attrValue = node.attributes['w:left'] && node.attributes['w:left'].value;
                if (!isNaN(attrValue)) {
                    result.style.marginLeft = {
                        unit: 'pt',
                        value: attrValue / 20
                    };
                }

                attrValue = node.attributes['w:right'] && node.attributes['w:right'].value;
                if (!isNaN(attrValue)) {
                    result.style.marginRight = {
                        unit: 'pt',
                        value: attrValue / 20
                    };
                }

                //hanging and firstLine are mutually exclusive
                attrValue = node.attributes['w:hanging'] && node.attributes['w:hanging'].value;
                if (!isNaN(attrValue)) {
                    result.style.textIndent = result.style.textIndent || {
                        unit: 'pt',
                        value: 0
                    };

                    result.style.textIndent.value = -attrValue / 20;
                } else {
                    attrValue = node.attributes['w:firstLine'] && node.attributes['w:firstLine'].value;
                    if (!isNaN(attrValue)) {
                        result.style.textIndent = result.style.textIndent || {
                            unit: 'pt',
                            value: 0
                        };

                        result.style.textIndent.value = attrValue / 20;
                    }
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
                result.properties[localName] = true;
                break;
            case 'numPr':
                const {attributes: idAttrs} = node.querySelector('numId') || {};
                const {attributes: levelAttrs} = node.querySelector('ilvl') || {};
                const id = idAttrs && idAttrs['w:val'] && idAttrs['w:val'].value;
                const level = levelAttrs && levelAttrs['w:val'] && levelAttrs['w:val'].value;

                result.properties.numbering = {
                    id: !isNaN(id) ? Number(id) : 0,
                    level: !isNaN(level) ? Number(level) : 0
                };

                break;
            case 'outlineLvl':
                attrValue = node.attributes['w:val'] && node.attributes['w:val'].value;
                result.properties.outlineLevel = !isNaN(attrValue) ? Number(attrValue) : 0;
                break;
            case 'pBdr':
                merge(result.style, parseBorderProperties(node));
                break;
            case 'pStyle':
                attrValue = node.attributes['w:val'] && node.attributes['w:val'].value;
                if (attrValue) {
                    if (!result.properties.className) {
                        result.properties.className = '';
                    } else {
                        attrValue = ' ' + attrValue;
                    }

                    result.properties.className += attrValue;
                    const headingInfo = (/Heading\s*([0-9]+)/i).exec(attrValue);

                    if (headingInfo) {
                        result.properties.heading = {
                            level: isNaN(headingInfo[1]) ? 0 : Number(headingInfo[1])
                        };
                    } else if ((/List\s*Paragraph/i).test(attrValue)) {
                        /**
                         * @description mark it as a list item
                         * @type {string}
                         */
                        result.properties.tagName = 'LI';
                    }
                }

                break;
            case 'rPr':
                result.properties.textProperties = merge(
                    result.properties.textProperties,
                    parseTextProperties(node, documentData)
                );
                break;
            case 'shd':
                attrValue = node.attributes['w:fill'] && node.attributes['w:fill'].value;
                if (attrValue) {
                    result.style.backgroundColor = normalizeColorValue(attrValue);
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
            case 'textAlignment':
                attrValue = node.attributes['w:val'] && node.attributes['w:val'].value;
                if (attrValue === 'subscript') {
                    result.properties.textProperties.properties.tagName = 'SUB';
                } else if (attrValue === 'superscript') {
                    result.properties.textProperties.properties.tagName = 'SUP';
                }

                break;
        }
    });

    return result;
}