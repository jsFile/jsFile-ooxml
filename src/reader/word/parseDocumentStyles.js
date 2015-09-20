import JsFile from 'JsFile';
import parseTextProperties from './parseTextProperties';
import parseParagraphProperties from './parseParagraphProperties';
import parseTableProperties from './parseTableProperties';
const {formatPropertyName, attributeToBoolean} = JsFile.Engine;

/**
 * @description Parsing document styles
 * @param xml
 * @return {Object}
 * @private
 */
export default function (xml) {
    let result = {
        defaults: {
            paragraphProperties: {},
            textProperties: {}
        },
        latentStyles: {
            exceptions: {}
        },
        usedStyles: {}
    };

    const node = xml.querySelector('styles');
    [].forEach.call(node && node.childNodes || [], function (node) {
        let localName = node.localName;
        if (localName === 'docDefaults') {
            let prNode = node.querySelector('rPrDefault rPr');
            if (prNode) {
                result.defaults.textProperties = parseTextProperties(prNode);
            }

            prNode = node.querySelector('pPrDefault pPr');
            if (prNode) {
                result.defaults.paragraphProperties = parseParagraphProperties(prNode);
            }
        } else if (localName === 'latentStyles') {
            Array.prototype.forEach.call(node.attributes || [], function (attr) {
                let value = attr.value || '';
                result.latentStyles[formatPropertyName(attr.name)] = isNaN(value) ? value : Number(value);
            });

            Array.prototype.forEach.call(node.querySelectorAll('lsdException'), function (node) {
                const data = {};

                Array.prototype.forEach.call(node.attributes, function (attr) {
                    const formattedName = formatPropertyName(attr.name);
                    let name;
                    if (formattedName === 'name') {
                        name = formattedName;
                        result.latentStyles.exceptions[name] = data;
                    }

                    if (name) {
                        result.latentStyles.exceptions[name][formattedName] =
                            isNaN(attr.value) ? (attr.value || '') : Number(attr.value);
                    } else {
                        data[formattedName] = isNaN(attr.value) ? (attr.value || '') : Number(attr.value);
                    }
                }, this);
            });
        } else if (localName === 'style') {
            let attr = node.attributes['w:styleId'];
            const value = attr && attr.value;

            if (value) {
                result.usedStyles[value] = {
                    isDefault: attributeToBoolean(node.attributes['w:default'])
                };

                let propertiesNode = node.querySelector('pPr');
                if (propertiesNode) {
                    result.usedStyles[value].paragraphProperties = parseParagraphProperties(propertiesNode);
                }

                propertiesNode = node.querySelector('rPr');
                if (propertiesNode) {
                    result.usedStyles[value].textProperties = parseTextProperties(propertiesNode);
                }

                propertiesNode = node.querySelector('tblPr');
                if (propertiesNode) {
                    result.usedStyles[value].tableProperties = parseTableProperties(propertiesNode);
                }

                attr = node.attributes['w:type'];
                result.usedStyles[value].type = (attr && attr.value) || '';

                propertiesNode = node.querySelector('name');
                attr = propertiesNode && propertiesNode.attributes['w:val'];
                if (attr && attr.value) {
                    result.usedStyles[value].name = attr.value;
                }

                propertiesNode = node.querySelector('rsid');
                attr = propertiesNode && propertiesNode.attributes['w:val'];
                if (attr && attr.value) {
                    result.usedStyles[value].rsid = attr.value;
                }

                propertiesNode = node.querySelector('basedOn');
                attr = propertiesNode && propertiesNode.attributes['w:val'];
                if (attr && attr.value) {
                    result.usedStyles[value].parentStyleId = attr.value;
                }

                propertiesNode = node.querySelector('next');
                attr = propertiesNode && propertiesNode.attributes['w:val'];
                if (attr && attr.value) {
                    result.usedStyles[value].nextElementStyle = attr.value;
                }

                propertiesNode = node.querySelector('uiPriority');
                attr = propertiesNode && propertiesNode.attributes['w:val'];
                if (attr && attr.value) {
                    result.usedStyles[value].uiPriority = Number(attr.value);
                }

                propertiesNode = node.querySelector('link');
                attr = propertiesNode && propertiesNode.attributes['w:val'];
                if (attr && attr.value) {
                    result.usedStyles[value].linkedStyle = attr.value;
                }

                propertiesNode = node.querySelector('unhideWhenUsed');
                result.usedStyles[value].unHideWhenUsed =
                    attributeToBoolean(propertiesNode && propertiesNode.attributes['w:val']);

                propertiesNode = node.querySelector('qFormat');
                result.usedStyles[value].isPrimary =
                    attributeToBoolean(propertiesNode && propertiesNode.attributes['w:val']);
            }
        }
    }, this);

    return result;
};