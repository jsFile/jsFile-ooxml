/**
 *
 * @description Parsing information about document
 * @param xml
 * @private
 * @return {Object}
 */
export default function parseDocumentInfo (xml) {
    const result = {};
    const node = xml && xml.querySelector('coreProperties');

    [].forEach.call(node && node.childNodes || [], ({textContent, localName}) => {
        let value;

        if (localName === 'created' || localName === 'modified') {
            value = (textContent && new Date(textContent)) || null;
        } else if (isNaN(textContent)) {
            value = textContent || '';
        } else {
            value = Number(textContent);
        }

        result[localName] = value;
    });

    return result;
}