import JsFile from 'JsFile';
const {dom: $} = JsFile;

/**
 *
 * @description Parsing information about document
 * @param xml
 * @private
 * @return {Object}
 */
export default function (xml) {
    let result = {};

    $.children(xml && xml.querySelector('coreProperties')).forEach(function (node) {
        let value,
            textContent = node.textContent || '',
            localName = node.localName;

        if (localName === 'created' || localName === 'modified') {
            value = (textContent && new Date(textContent)) || null;
        } else if (!isNaN(textContent)) {
            value = Number(textContent);
        } else {
            value = textContent;
        }

        result[localName] = value;
    });

    return result;
};