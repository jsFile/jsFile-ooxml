import {dom as $} from 'JsFile';

/**
 *
 * @description Parsing information about document
 * @param xml
 * @private
 * @return {Object}
 */
export default function (xml) {
    let result = {};

    $.children(xml && xml.querySelector('coreProperties')).forEach(({textContent, localName}) => {
        let value;

        if (localName === 'created' || localName === 'modified') {
            value = (textContent && new Date(textContent)) || null;
        } else if (!isNaN(textContent)) {
            value = Number(textContent);
        } else {
            value = textContent || '';
        }

        result[localName] = value;
    });

    return result;
};