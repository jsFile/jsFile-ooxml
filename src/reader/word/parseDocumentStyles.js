import JsFile from 'JsFile';
import parseTextProperties from './parseTextProperties';
import parseParagraphProperties from './parseParagraphProperties';
import parseTableProperties from './parseTableProperties';
const {formatPropertyName, attributeToBoolean} = JsFile.Engine;
const parsers = {
    rPr: {
        name: 'textProperties',
        selector: 'p',//set for all content in paragraph
        exec: parseTextProperties
    },
    pPr: {
        name: 'paragraphProperties',
        selector: 'p',
        exec: parseParagraphProperties
    },
    tblPr: {
        name: 'tableProperties',
        selector: 'table',
        exec: parseTableProperties
    }
};

/**
 * @description Parsing document styles
 * @param xml
 * @return {Object}
 * @private
 */
export default function (xml) {
    const result = {
        defaults: {
            paragraphProperties: {},
            textProperties: {}
        },
        latentStyles: {
            exceptions: {}
        },
        computed: [],
        named: {}
    };
    const node = xml.querySelector('styles');
    const forEach = [].forEach;

    forEach.call(node && node.childNodes || [], (node) => {
        const {localName} = node;
        if (localName === 'docDefaults') {
            forEach.call(node.querySelectorAll('rPr, pPr'), (node) => {
                const {exec, name, selector} = parsers[node.localName] || {};
                if (exec) {
                    result.defaults[name] = exec(node);
                    result.computed.push({
                        selector: selector,
                        properties: result.defaults[name].style
                    });
                }
            });
        } else if (localName === 'latentStyles') {
            forEach.call(node.attributes || [], ({name, value = ''}) => {
                result.latentStyles[formatPropertyName(name)] = isNaN(value) ? value : Number(value);
            });

            forEach.call(node.querySelectorAll('lsdException'), (node) => {
                const data = {};
                let exName;

                forEach.call(node.attributes || [], ({name, value = ''}) => {
                    const formattedName = formatPropertyName(name);
                    if (formattedName === 'name') {
                        exName = formattedName;
                        result.latentStyles.exceptions[exName] = data;
                    }

                    if (exName) {
                        result.latentStyles.exceptions[exName][formattedName] = isNaN(value) ? value : Number(value);
                    } else {
                        data[formattedName] = isNaN(value) ? value : Number(value);
                    }
                });
            });
        } else if (localName === 'style') {
            let attr = node.attributes['w:styleId'];
            const value = attr && attr.value;

            if (value) {
                result.named[value] = {
                    isDefault: attributeToBoolean(node.attributes['w:default']),
                    type: node.attributes['w:type'] &&  node.attributes['w:type'].value
                };

                forEach.call(node.childNodes || [], function (node) {
                    const {localName, attributes} = node;
                    const {exec, name, selector} = parsers[localName] || {};
                    if (exec) {
                        this[name] = exec(node);
                    } else if (['name', 'rsid', 'basedOn', 'next', 'uiPriority', 'link'].indexOf(localName) >= 0) {
                        attr = attributes['w:val'];
                        if (attr && attr.value) {
                            this[localName] = attr.value;
                        }
                    } else if (localName === 'unhideWhenUsed') {
                        this.unHideWhenUsed = attributeToBoolean(attributes['w:val']);
                    } else if (localName === 'qFormat') {
                        this.isPrimary = attributeToBoolean(attributes['w:val']);
                    }
                }, result.named[value]);
            }
        }
    });

    return result;
};