import JsFile from 'JsFile';
const {attributeToBoolean} = JsFile.Engine;

/**
 * @description Parsing document web settings
 * @param xml
 * @return {Object}
 * @private
 */
export default function parseWebSettings (xml) {
    const result = {};
    const node = xml && xml.querySelector('webSettings');

    [].forEach.call(node && node.childNodes || [], (node) => {
        result[node.localName] = attributeToBoolean(node.attributes['w:val']);
    });

    return result;
}