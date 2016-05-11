import JsFile from 'JsFile';
import parseLanguageNode from './parse-language-node';
const {formatPropertyName} = JsFile.Engine;

/**
 * @description Parse document settings
 * @param xml
 * @return {Object}
 * @private
 */
export default function parseDocumentSettings (xml) {
    const result = {
        zoom: 100,
        compat: {},
        rsids: {
            rsidRoot: '',
            values: []
        },
        mathProperties: {},
        shapeDefaults: {
            defaults: {},
            layout: {}
        },
        colorSchemeMapping: {}
    };
    const node = xml && xml.querySelector('settings');

    // eslint-disable-next-line complexity
    [].forEach.call(node && node.childNodes || [], (node) => {
        let attr;
        let subNode;

        switch (node.localName) {
            case 'zoom':
                attr = node.attributes['w:percent'];
                if (attr && !isNaN(attr.value)) {
                    result.zoom = Number(attr.value);
                }

                break;
            case 'proofState':
                attr = node.attributes['w:spelling'];
                result.checkSpelling = Boolean(attr && attr.value === 'clean');
                attr = node.attributes['w:grammar'];
                result.checkGrammar = Boolean(attr && attr.value === 'clean');
                break;
            case 'defaultTabStop':
                attr = node.attributes['w:val'];
                result.defaultTabStop = (attr && !isNaN(attr.value)) ? Number(attr.value) : 1;
                break;
            case 'characterSpacingControl':
                attr = node.attributes['w:val'];
                result.controlCharacterSpacing = Boolean(attr && attr.value !== 'doNotCompress');
                break;
            case 'compat':
                Array.prototype.forEach.call(node.querySelectorAll('compatSetting'), ({attributes}) => {
                    const nameAttr = attributes['w:name'];
                    const uriAttr = attributes['w:uri'];
                    const valueAttr = attributes['w:val'];

                    if (nameAttr && nameAttr.value) {
                        result.compat[nameAttr.value] = {
                            uri: (uriAttr && uriAttr.value) || '',
                            value: (valueAttr && !isNaN(valueAttr.value)) ? Number(valueAttr.value) : 0
                        };
                    }
                });

                break;
            case 'shapeDefaults':
                subNode = node.querySelector('shapedefaults');

                if (subNode) {
                    attr = subNode.attributes['v:ext'];
                    result.shapeDefaults.defaults.ext = (attr && attr.value) || '';

                    attr = subNode.attributes.style;
                    result.shapeDefaults.defaults.style = (attr && attr.value) || '';

                    attr = subNode.attributes.spidmax;
                    result.shapeDefaults.defaults.spidMax = (attr && !isNaN(attr.value)) ? Number(attr.value) : 0;
                }

                subNode = node.querySelector('shapelayout');
                if (subNode) {
                    attr = subNode.attributes['v:ext'];
                    subNode = subNode.querySelector('idmap');
                    result.shapeDefaults.layout.ext = (attr && attr.value) || '';
                    result.shapeDefaults.layout.idMap = {};
                    if (subNode) {
                        attr = subNode.attributes['v:ext'];
                        result.shapeDefaults.layout.idMap.ext = (attr && attr.value) || '';
                        attr = subNode.attributes.data;
                        result.shapeDefaults.layout.idMap.data = (attr && !isNaN(attr.value)) ? Number(attr.value) : 0;
                    }
                }

                break;
            case 'themeFontLang':
                result.themeFontLanguage = parseLanguageNode(node);
                break;
            case 'decimalSymbol':
                attr = node.attributes['w:val'];
                result.decimalSymbol = (attr && attr.value) || '';
                break;
            case 'listSeparator':
                attr = node.attributes['w:val'];
                result.listSeparator = (attr && attr.value) || '';
                break;
            case 'clrSchemeMapping':
                Array.prototype.forEach.call(node.attributes || [], (attr) => {
                    if (attr.value) {
                        result.colorSchemeMapping[formatPropertyName(attr.name)] = attr.value;
                    }
                });

                break;
            case 'rsids':
                subNode = node.querySelector('rsidRoot');
                attr = subNode && subNode.attributes['w:val'];
                result.rsids.rsidRoot = (attr && attr.value) || '';

                Array.prototype.forEach.call(node.querySelectorAll('rsid'), (node) => {
                    const attr = node.attributes['w:val'];

                    if (attr && attr.value) {
                        result.rsids.values.push(attr.value);
                    }
                });

                break;
            case 'mathPr':
                result.mathProperties.intLimit = '';

                // eslint-disable-next-line complexity
                [].forEach.call(node && node.childNodes || [], ({localName, attributes = {}}) => {
                    const attr = attributes['m:val'];
                    const attrValue = attr && attr.value;

                    switch (localName) {
                        case 'mathFont':
                            result.mathProperties.mathFont = attrValue || '';
                            break;
                        case 'brkBin':
                            /**
                             * @description Values : after, before, repeat
                             * @type {String}
                             */
                            result.mathProperties.breakOnBinary = attrValue || '';
                            break;
                        case 'brkBinSub':
                            /**
                             * @description Values : --, +-, -+
                             * @type {String}
                             */
                            result.mathProperties.breakOnBinarySubtraction = attrValue || '';
                            break;
                        case 'smallFrac':
                            result.mathProperties.onSmallFraction = Boolean(attr && (attrValue !== '0'));
                            break;
                        case 'dispDef':
                            result.mathProperties.displayDefault = Boolean(attr && (attrValue !== '0'));
                            break;
                        case 'lMargin':
                            result.mathProperties.leftMargin = (attr && !isNaN(attrValue)) ? Number(attrValue) : 0;
                            break;
                        case 'rMargin':
                            result.mathProperties.rightMargin = (attr && !isNaN(attrValue)) ? Number(attrValue) : 0;
                            break;
                        case 'defJc':
                            result.mathProperties.align = attrValue || 'left';

                            if (result.mathProperties.align === 'centerGroup') {
                                result.mathProperties.align = 'center';
                            }

                            break;
                        case 'preSp':
                            result.mathProperties.preSpacing = (attr && !isNaN(attrValue)) ? Number(attrValue) : 0;
                            break;
                        case 'postSp':
                            result.mathProperties.postSpacing = (attr && !isNaN(attrValue)) ? Number(attrValue) : 0;
                            break;
                        case 'interSp':
                            result.mathProperties.interSpacing = (attr && !isNaN(attrValue)) ? Number(attrValue) : 0;
                            break;
                        case 'intraSp':
                            result.mathProperties.intraSpacing = (attr && !isNaN(attrValue)) ? Number(attrValue) : 0;
                            break;
                        case 'wrapIndent':
                            result.mathProperties.wrapIndent = (attr && !isNaN(attrValue)) ? Number(attrValue) : 0;
                            break;
                        case 'wrapRight':
                            result.mathProperties.wrapRight = (attr && !isNaN(attrValue)) ? Number(attrValue) : 0;
                            break;
                        case 'intLim':
                            if (!attr) {
                                result.mathProperties.intLimit = '';
                            } else if (attrValue === 'undOvr') {
                                result.mathProperties.intLimit = 'UnderOverLocation';
                            } else if (attrValue === 'subSup') {
                                result.mathProperties.intLimit = 'SubscriptSuperscriptLocation';
                            }

                            break;
                        case 'naryLim':
                            if (!attr) {
                                result.mathProperties.naryLimit = '';
                            } else if (attrValue === 'undOvr') {
                                result.mathProperties.naryLimit = 'UnderOverLocation';
                            } else if (attrValue === 'subSup') {
                                result.mathProperties.naryLimit = 'SubscriptSuperscriptLocation';
                            }

                            break;

                        default:
                            // do nothing
                    }
                });

                break;

            default:
                // do nothing
        }
    });

    return result;
}