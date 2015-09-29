import JsFile from 'JsFile';
const {formatPropertyName} = JsFile.Engine;

/**
 *
 * @description Parsing information about fonts
 * @param xml
 * @return {Object}
 * @private
 */
export default function (xml) {
    const result = {};
    const forEach = [].forEach;

    forEach.call((xml && xml.querySelectorAll('font')) || [], function (node) {
        let name = node.attributes['w:name'] && node.attributes['w:name'].value;
        if (name) {
            result[name] = {};
            forEach.call(node && node.childNodes || [], ({localName, attributes}) => {
                if (localName === 'sig') {
                    result[name][localName] = {};
                    forEach.call(attributes || [], function ({name, value}) {
                        this[formatPropertyName(name)] = value;
                    }, result[name][localName]);
                } else {
                    result[name][localName] = attributes['w:val'] && attributes['w:val'].value;
                }
            });
        }
    });

    return result;
};