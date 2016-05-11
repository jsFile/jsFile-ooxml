import JsFile from 'JsFile';
import parseParagraphProperties from './parse-paragraph-properties';
import getRelationship from './get-relationship';
import parseText from './parse-text';
const {Document} = JsFile;
const {merge} = JsFile.Engine;

/**
 *
 * @param params
 * @returns {*}
 */
export default function parseParagraph (params) {
    const {node, documentData} = params;
    const result = Document.elementPrototype;
    const forEach = [].forEach;

    result.properties.tagName = 'P';

    if (!node || !documentData) {
        return result;
    }

    if (documentData.styles.defaults.paragraphProperties) {
        merge(result.properties, documentData.styles.defaults.paragraphProperties.properties);
    }

    forEach.call(node && node.childNodes || [], (node) => {
        let attrValue;
        let element;
        const localName = node.localName;

        switch (localName) {
            case 'bookmarkStart':
                attrValue = node.attributes['w:name'] && node.attributes['w:name'].value;
                if (attrValue) {
                    element = Document.elementPrototype;
                    element.properties.tagName = 'A';
                    element.properties.name = attrValue;
                    result.children.push(element);
                }

                break;
            case 'pPr':
                {
                    const props = parseParagraphProperties(node, documentData);

                    if (result.properties.tagName === 'LI') {
                        /**
                         * @description Clear paragraph styles
                         * @type {*}
                         */
                        result.style = {};
                    }

                    merge(result, props);
                    break;
                }
            case 'hyperlink':
                {
                    let href = '#';

                    element = Document.elementPrototype;
                    element.properties.tagName = 'A';
                    attrValue = node.attributes['r:id'] && node.attributes['r:id'].value;
                    const relationship = (attrValue && getRelationship(attrValue, documentData)) || null;

                    forEach.call(node && node.childNodes || [], (node) => {
                        element.children.push(parseText({
                            node,
                            documentData
                        }));
                    });

                    if (relationship) {
                        href = relationship.target;
                        element.properties.target = '_blank';
                    } else {
                        href += (node.attributes['w:anchor'] && node.attributes['w:anchor'].value) || '';
                    }

                    element.properties.href = href;
                    result.children.push(element);
                    break;
                }
            case 'r':
                result.children.push(parseText({
                    node,
                    documentData
                }));

                break;

            default:
                // ignore fldSimple node
        }
    });

    return result;
}