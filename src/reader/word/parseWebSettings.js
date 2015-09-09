import JsFile from 'JsFile';
const {dom: $} = JsFile;
const {attributeToBoolean} = JsFile.Engine;

/**
 * @description Parsing document web settings
 * @param xml
 * @return {Object}
 * @private
 */
export default function (xml) {
    const result = {};

    $.children(xml && xml.querySelector('webSettings')).forEach((node) => {
        result[node.localName] = attributeToBoolean(node.attributes['w:val']);
    });

    return result;
};