import JsFile from 'JsFile';
const {dom: $} = JsFile;

/**
 *
 * @param xml
 * @returns {*}
 * @private
 */
export default function (xml) {
    const themeElementsNode = xml.querySelector('themeElements');
    const result = {
        style: {}
    };

    $.children(themeElementsNode).forEach(function (node) {
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