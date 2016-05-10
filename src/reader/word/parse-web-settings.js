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
    const webSettingsNodes = (xml && xml.querySelector('webSettings') || {}).childNodes || [];

    [].forEach.call(webSettingsNodes, (node) => {
        result[node.localName] = attributeToBoolean(node.attributes['w:val']);
    });

    return result;
}