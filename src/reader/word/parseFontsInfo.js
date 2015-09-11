import JsFile from 'JsFile';
const {dom: $} = JsFile;
const {formatPropertyName} = JsFile.Engine;

/**
 *
 * @description Parsing information about fonts
 * @param xml
 * @return {Object}
 * @private
 */
export default function (xml) {
    let result = {};
    Array.prototype.forEach.call((xml && xml.querySelectorAll('font')) || [], function (node) {
        let name = node.attributes['w:name'] && node.attributes['w:name'].value;
        if (name) {
            result[name] = {};
            $.children(node).forEach(({localName, attributes}) => {
                if (localName === 'sig') {
                    result[name][localName] = {};

                    Array.prototype.forEach.call(attributes || [], function ({name, value}) {
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