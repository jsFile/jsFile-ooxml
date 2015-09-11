import JsFile from 'JsFile';
import parseStyleEffectProperty from './parseStyleEffectProperty';
import parseEmphasis from './parseEmphasis';
import parseLanguageNode from './parseLanguageNode';
import normalizeVerticalAlign from './normalizeVerticalAlign';
const {dom: $} = JsFile;
const {merge, attributeToBoolean, normalizeColorValue} = JsFile.Engine;

export default function (node, documentData) {
    let result = {
        style: {}
    };

    $.children(node).forEach(({attributes, localName}) => {
        let attr;
        let attrValue;

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
                let usedStyleData = attrValue && documentData && documentData.styles &&
                    documentData.styles.usedStyles && documentData.styles.usedStyles[attrValue];

                result.styleId = attrValue;
                if (usedStyleData) {
                    result = merge(result, usedStyleData.textProperties);
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
                attr = attributes['w:val'];
                if (attr) {
                    result.style.verticalAlign = normalizeVerticalAlign(attr);
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
                                result.majorFontFamily = true;
                            } else if ((/minor/ig).test(attr.value)) {
                                result.minorFontFamily = true;
                            }
                        }
                    }
                }

                break;
            case 'oMath':
                result.math = (attributeToBoolean(attributes['w:val']));
                break;
            case 'snapToGrid':
                result.useDocumentGrid = (attributeToBoolean(attributes['w:val']));
                break;
            case 'webHidden':
                result.webHiddenText = (attributeToBoolean(attributes['w:val']));
                break;
            case 'noProof':
                result.checkSpellingGrammar = !(attributeToBoolean(attributes['w:val']));
                break;
            case 'fitText':
                result.fitText = result.fitText || {};
                attrValue = attributes['w:id'] && attributes['w:id'].value;
                result.fitText.id = attrValue || null;
                attrValue = attributes['w:val'] && attributes['w:val'].value;
                result.fitText.width = !isNaN(attrValue) ? {
                    value: attrValue / 20,
                    unit: 'pt'
                } : null;
                break;
            case 'effect':
                result.effect = parseStyleEffectProperty(node);
                break;
            case 'eastAsianLayout':
                result.eastAsianSettings = {
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
                    result.position = {
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
            case 'w':
                attrValue = attributes['w:val'] && attributes['w:val'].value;
                result.textScale = !isNaN(attrValue) ? Number(attrValue) : result.textScale;
                break;
            case 'em':
                result.emphasis = parseEmphasis(attributes['w:val']);
                break;
            case 'highlight':
                attrValue = attributes['w:val'] && attributes['w:val'].value;
                result.highlight = attrValue ? normalizeColorValue(attrValue) : result.highlight;
                break;
            case 'bdr':
                result.textBorder = {
                    color: (attributes['w:color'] && normalizeColorValue(attributes['w:color'].value)) || '',
                    themeColor: (attributes['w:themeColor'] && normalizeColorValue(attributes['w:themeColor'].value)) || '',
                    shadow: attributeToBoolean(attributes['w:shadow']),
                    frame: attributeToBoolean(attributes['w:frame'])
                };

                attrValue = attributes['w:sz'] && attributes['w:sz'].value;
                if (!isNaN(attrValue)) {
                    result.textBorder.width = {
                        value: attrValue / 8,
                        unit: 'pt'
                    };
                }

                break;
            case 'lang':
                result.language = parseLanguageNode(node);
                break;
        }
    });

    return result;
}