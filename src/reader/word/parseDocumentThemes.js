/**
 *
 * @param xml
 * @returns {*}
 * @private
 */
export default function parseDocumentThemes (xml) {
    const node = xml.querySelector('themeElements');
    const result = {
        style: {}
    };

    [].some.call(node && node.childNodes || [], (node) => {
        if (node.localName === 'fontScheme') {
            let font = node.querySelector('minorFont > latin');
            if (font && font.attributes.typeface && font.attributes.typeface.value) {
                result.style.fontFamily = font.attributes.typeface.value;
            }

            font = node.querySelector('majorFont > latin');
            if (font && font.attributes.typeface && font.attributes.typeface.value) {
                result.style.fontFamily = font.attributes.typeface.value;
            }

            return true;
        }
    });

    return result;
}