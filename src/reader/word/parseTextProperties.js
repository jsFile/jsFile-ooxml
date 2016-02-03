import JsFile from 'JsFile';
import parseStyleEffectProperty from './parseStyleEffectProperty';
import parseEmphasis from './parseEmphasis';
import parseLanguageNode from './parseLanguageNode';
const {attributeToBoolean, normalizeColorValue} = JsFile.Engine;

export default function parseTextProperties (node) {
    const result = {
        style: {},
        properties: {}
    };

    [].forEach.call(node && node.childNodes || [], (node) => {
        let attr;
        let attrValue;
        const {attributes, localName} = node;

        switch (localName) {
            case 'b':
                result.style.fontWeight = attributeToBoolean(attributes['w:val']) ? 'normal' : 'bold';
                break;
            case 'bCs':
                result.style.fontWeight = attributeToBoolean(attributes['w:val']) ? result.style.fontWeight : 'bold';
                break;
            case 'i':
                attr = attributes['w:val'];
                result.style.fontStyle = (attr && !attributeToBoolean(attr)) ? 'normal' : 'italic';
                break;
            case 'caps':
            case 'smallCaps':
                attr = attributes['w:val'];
                if (!attr || attributeToBoolean(attr)) {
                    result.style.textTransform = 'uppercase';
                }

                break;
            case 'color':
                attrValue = attributes['w:val'] && attributes['w:val'].value;
                if (attrValue) {
                    result.style.color = normalizeColorValue(attrValue);
                }

                //TODO: parse attributes  themeColor, themeShade, themeTint
                break;
            case 'dstrike':
            case 'strike':
                attr = attributes['w:val'];
                result.style.textDecoration = (attr && !attributeToBoolean(attr)) ? 'none' : 'line-through';
                break;
            case 'emboss':
            case 'imprint':
                attr = attributes['w:val'];
                if (!attr || attributeToBoolean(attr)) {
                    result.style.textShadow = '-1pt -1pt 1pt #000000';
                }

                break;
            case 'outline':
                attr = attributes['w:val'];
                if (!attr || attributeToBoolean(attr)) {
                    result.style.textStroke = '1pt #000000';
                }

                break;
            case 'rStyle':
                attrValue = attributes['w:val'] && attributes['w:val'].value;
                if (attrValue) {
                    if (!result.properties.className) {
                        result.properties.className = '';
                    } else {
                        attrValue = ' ' + attrValue;
                    }

                    result.properties.className += attrValue;
                }

                break;
            case 'shadow':
                attr = attributes['w:val'];
                result.style.textShadow = (attr && !attributeToBoolean(attr)) ? 'none' : '-1pt 0 1pt #000000';
                break;
            case 'sz':
            case 'szCs':
                attrValue = attributes['w:val'] && attributes['w:val'].value;
                if (!isNaN(attrValue) && (localName === 'sz' || !result.style.fontSize)) {
                    result.style.fontSize = {
                        unit: 'pt',
                        value: attrValue / 2
                    };
                }

                break;
            case 'u':
                attrValue = attributes['w:val'] && attributes['w:val'].value;
                if (attrValue && attrValue !== 'none') {
                    result.style.textDecoration = 'underline';
                }

                break;
            case 'specVanish':
            case 'vanish':
                attr = attributes['w:val'];
                result.style.visibility = (attr && !attributeToBoolean(attr)) ? 'visible' : 'hidden';
                break;
            case 'vertAlign':
                attr = attributes['w:val'] && attributes['w:val'].value;
                if (attr === 'subscript') {
                    result.properties.tagName = 'SUB';
                } else if (attr === 'superscript') {
                    result.properties.tagName = 'SUP';
                }

                break;
            case 'rtl':
                result.style.direction = attributeToBoolean(attributes['w:val']) ? 'rtl' : 'ltr';
                break;
            case 'iCs':
                attr = attributes['w:val'];
                if (attr && !attributeToBoolean(attr)) {
                    result.style.fontStyle = 'italic';
                }

                break;

            //TODO parse 'w:cs'
            case 'rFonts':
                attr = attributes['w:ascii'];
                if (attr) {
                    result.style.fontFamily = attr.value || '';
                } else {
                    attr = attributes['w:cs'];
                    if (attr) {
                        result.style.fontFamily = attr.value || '';
                    } else {
                        attr = attributes['w:asciiTheme'];
                        if (attr) {
                            if ((/major/ig).test(attr.value)) {
                                result.properties.majorFontFamily = true;
                            } else if ((/minor/ig).test(attr.value)) {
                                result.properties.minorFontFamily = true;
                            }
                        }
                    }
                }

                break;
            case 'oMath':
                result.properties.math = (attributeToBoolean(attributes['w:val']));
                break;
            case 'snapToGrid':
                result.properties.useDocumentGrid = (attributeToBoolean(attributes['w:val']));
                break;
            case 'webHidden':
                result.properties.webHiddenText = (attributeToBoolean(attributes['w:val']));
                break;
            case 'noProof':
                result.properties.checkSpellingGrammar = !(attributeToBoolean(attributes['w:val']));
                break;
            case 'fitText':
                result.properties.fitText = result.properties.fitText || {};
                attrValue = attributes['w:id'] && attributes['w:id'].value;
                result.fitText.id = attrValue || null;
                attrValue = attributes['w:val'] && attributes['w:val'].value;
                result.fitText.width = !isNaN(attrValue) ? {
                    value: attrValue / 20,
                    unit: 'pt'
                } : null;
                break;
            case 'effect':
                result.properties.effect = parseStyleEffectProperty(node);
                break;
            case 'eastAsianLayout':
                result.properties.eastAsianSettings = {
                    id: attributes['w:id'] ? attributes['w:id'].value : null,
                    combines: Boolean(attributes['w:combine']),
                    isVertical: Boolean(attributes['w:vert']),
                    verticalCompress: Boolean(attributes['w:vertCompress']),
                    combineBrackets: attributes['w:combineBrackets'] && attributes['w:combineBrackets'].value
                };

                break;
            case 'position':
                attrValue = attributes['w:val'] && attributes['w:val'].value;
                if (!isNaN(attrValue)) {
                    result.properties.position = {
                        value: attrValue / 2,
                        unit: 'pt'
                    };
                }

                break;
            case 'kern':
                attrValue = attributes['w:val'] && attributes['w:val'].value;
                if (!isNaN(attrValue)) {
                    result.style.letterSpacing = {
                        value: attrValue / 20,
                        unit: 'pt'
                    };
                }

                break;
            case 'shd':
                attrValue = attributes['w:fill'] && attributes['w:fill'].value;
                if (attrValue) {
                    result.style.backgroundColor = normalizeColorValue(attrValue);
                }

                break;
            case 'em':
                result.properties.emphasis = parseEmphasis(attributes['w:val']);
                break;
            case 'highlight':
                attrValue = attributes['w:val'] && attributes['w:val'].value;
                attrValue = attrValue && normalizeColorValue(attrValue);
                if (attrValue) {
                    result.style.backgroundColor = attrValue;
                }

                break;
            case 'bdr':
                const color = attributes['w:color'] && normalizeColorValue(attributes['w:color'].value);
                const width = attributes['w:sz'] && (attributes['w:sz'].value / 8);

                if (color && !isNaN(width)) {
                    result.style.borderWidth = {
                        //can't show the border with small width
                        value: (width > 1 || width <= 0) ? width : Math.ceil(width / 8),
                        unit: 'pt'
                    };
                    result.style.borderColor = color;
                    result.style.borderStyle = 'solid';
                }

                break;
            case 'lang':
                const lang = parseLanguageNode(node).latin;
                if (lang) {
                    result.properties.lang = lang;
                }

                break;
        }
    });

    return result;
}