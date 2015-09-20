import JsFile from 'JsFile';

/**
 *
 * @param xml
 * @returns {*}
 * @private
 */
export default function (xml) {
    const node = xml && xml.querySelector('themeElements');
    const result = {
        style: {}
    };

    [].forEach.call(node && node.childNodes || [], function (node) {
        if (node.localName === 'fontScheme') {
            let font = node.querySelector('minorFont > latin');
            if (font && font.attributes.typeface && font.attributes.typeface.value) {
                result.style.fontFamily = font.attributes.typeface.value;
            }

            font = node.querySelector('majorFont > latin');
            if (font && font.attributes.typeface && font.attributes.typeface.value) {
                result.style.fontFamily = font.attributes.typeface.value;
            }
        }
    });

    return result;
};