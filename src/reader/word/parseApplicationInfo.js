import JsFile from 'JsFile';
const {dom: $} = JsFile;
const {formatPropertyName} = JsFile.Engine;

/**
 *
 * @description Parsing information about application
 * @param xml
 * @private
 * @return {Object}
 */
export default function (xml) {
    let result = {};

    $.children(xml && xml.querySelector('Properties')).forEach((node) => {
        let value;
        const textContent = node.textContent || '';
        const localName = (node.localName || '').split('');
        const name = formatPropertyName(localName);

        // convert to number
        if (!isNaN(textContent)) {
            value = Number(textContent);
        } else {
            // convert to boolean
            if (textContent === 'true' || textContent === 'false') {
                value = textContent === 'true';
            } else {
                value = textContent;
            }
        }

        result[name] = value;
    });

    return result;
};