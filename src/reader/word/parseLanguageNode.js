/**
 *
 * @param node
 * @return {Object}
 * @private
 */
export default function parseLanguageNode (node) {
    const result = {
        latin: null,
        eastAsia: null,
        complexLanguage: null
    };

    if (node) {
        let attr = node.attributes['w:val'];
        result.latin = (attr && attr.value) || result.latin;

        attr = node.attributes['w:bidi'];
        result.complexLanguage = (attr && attr.value) || result.complexLanguage;

        attr = node.attributes['w:eastAsia'];
        result.eastAsia = (attr && attr.value) || result.eastAsia;
    }

    return result;
}