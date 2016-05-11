import JsFile from 'JsFile';
import parseTextProperties from './parse-text-properties';
import normalizeLineHeight from './normalize-line-height';
import parseBorderProperties from './parse-border-properties';
const {merge, normalizeColorValue} = JsFile.Engine;
const alignmentValues = ['left', 'right', 'center'];

export default function parseParagraphProperties (node, documentData) {
    const result = {
        style: {},
        properties: {
            textProperties: {
                properties: {}
            }
        }
    };
    const forEach = [].forEach;

    // eslint-disable-next-line complexity
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

                // hanging and firstLine are mutually exclusive
                attrValue = node.attributes['w:hanging'] && node.attributes['w:hanging'].value;
                if (isNaN(attrValue)) {
                    attrValue = node.attributes['w:firstLine'] && node.attributes['w:firstLine'].value;

                    if (!isNaN(attrValue)) {
                        if (!result.style.textIndent) {
                            result.style.textIndent = {
                                unit: 'pt',
                                value: 0
                            };
                        }

                        result.style.textIndent.value = attrValue / 20;
                    }
                } else {
                    if (!result.style.textIndent) {
                        result.style.textIndent = {
                            unit: 'pt',
                            value: 0
                        };
                    }

                    result.style.textIndent.value = -attrValue / 20;
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
                {
                    const {attributes: idAttrs} = node.querySelector('numId') || {};
                    const {attributes: levelAttrs} = node.querySelector('ilvl') || {};
                    const id = idAttrs && idAttrs['w:val'] && idAttrs['w:val'].value;
                    const level = levelAttrs && levelAttrs['w:val'] && levelAttrs['w:val'].value;

                    result.properties.numbering = {
                        id: isNaN(id) ? 0 : Number(id),
                        level: isNaN(level) ? 0 : Number(level)
                    };

                    break;
                }
            case 'outlineLvl':
                attrValue = node.attributes['w:val'] && node.attributes['w:val'].value;
                result.properties.outlineLevel = isNaN(attrValue) ? 0 : Number(attrValue);
                break;
            case 'pBdr':
                merge(result.style, parseBorderProperties(node));
                break;
            case 'pStyle':
                attrValue = node.attributes['w:val'] && node.attributes['w:val'].value;
                if (attrValue) {
                    if (result.properties.className) {
                        attrValue = ` ${ attrValue }`;
                    } else {
                        result.properties.className = '';
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

            default:
            // do nothing
        }
    });

    return result;
}