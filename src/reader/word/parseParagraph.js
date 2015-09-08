import $ from './../../../../core/dom/index';
import Document from './../../../../core/document/index';
import merge from './../../../../core/jdoc/helpers/merge';
import clone from './../../../../core/jdoc/helpers/clone';
import parseParagraphProperties from './parseParagraphProperties';
import getRelationship from './getRelationship';
import parseText from './parseText';

/**
 *
 * @param params
 * @returns {*}
 */
export default function (params) {
    let {node, documentData, style} = params,
        paragraphProperties,
        result = Document.elementPrototype;

    result.properties.tagName = 'P';

    if (!node || !documentData) {
        return result;
    }
    paragraphProperties = clone(documentData.styles.defaults.paragraphProperties);
    merge(result.style, paragraphProperties.style, style);

    $.children(node).forEach(node => {
        let attrValue,
            el,
            localName = node.localName;

        switch (localName) {
            case 'bookmarkStart':
                attrValue = node.attributes['w:name'] && node.attributes['w:name'].value;

                if (attrValue) {
                    el = Document.elementPrototype;
                    el.properties.tagName = 'A';
                    el.properties.name = attrValue;
                    result.children.push(el);
                }
                break;
            case 'pPr':
                let props = parseParagraphProperties(node, documentData);
                merge(paragraphProperties, props);

                if (paragraphProperties.isListItem) {
                    /**
                     * @description Clear paragraph styles
                     * @type {*}
                     */
                    result.style = {};
                    paragraphProperties.style = props.style;
                }
                merge(result.style, paragraphProperties.style);
                break;
            case 'hyperlink':
                let href = '#',
                    relationship;

                el = Document.elementPrototype;
                el.properties.tagName = 'A';
                attrValue = node.attributes['r:id'] && node.attributes['r:id'].value;

                relationship = (attrValue && getRelationship(attrValue, documentData)) || null;

                $.children(node).forEach(function (node) {
                    let child = parseText({
                        node,
                        documentData,
                        style: paragraphProperties.textProperties && paragraphProperties.textProperties.style
                    });

                    el.children.push(child);
                });

                if (relationship) {
                    href = relationship.target;
                    el.properties.target = '_blank';
                } else {
                    href += (node.attributes['w:anchor'] && node.attributes['w:anchor'].value) || '';
                }

                el.properties.href = href;
                result.children.push(el);

                break;
            case 'r':
                el = parseText({
                    node,
                    documentData,
                    style: paragraphProperties.textProperties && paragraphProperties.textProperties.style
                });

                result.children.push(el);
                break;
            // ignore fldSimple node
        }
    });

    return result;
}