import JsFile from 'JsFile';
import parseTextProperties from './parse-text-properties';
import parseDrawing from './parse-drawing';
import parsePicture from './parse-picture';
const {Document} = JsFile;
const {merge, clone, nbHyphen, enDash, space, tabAsSpaces} = JsFile.Engine;

export default function parseText (params = {}) {
    const {node, documentData} = params;
    const result = Document.elementPrototype;
    const forEach = [].forEach;

    result.properties.tagName = 'SPAN';

    if (!node || !documentData) {
        return result;
    }

    const textProperties = {
        style: {},
        properties: documentData.styles.defaults.textProperties &&
        clone(documentData.styles.defaults.textProperties.properties) || {}
    };

    forEach.call(node && node.childNodes || [], (childNode) => {
        let element = null;
        const {textContent = '', attributes} = childNode;

        switch (childNode.localName) {
            case 'cr':
                element = Document.elementPrototype;
                element.properties.tagName = 'BR';
                result.children.push(element);
                break;
            case 'br':
                {
                    const type = attributes['w:type'] && attributes['w:type'].value;
                    const clear = attributes['w:clear'] && attributes['w:clear'].value;

                    if (!type || type === 'textWrapping') {
                        element = Document.elementPrototype;

                        if (!clear || clear === 'none' || clear === 'all') {
                            element.properties.tagName = 'BR';
                        }

                        result.children.push(element);
                    }

                    // TODO: parse types 'column' & 'page', parse clear 'left' & 'right'
                    break;
                }
            case 'drawing':
                merge(result, parseDrawing(childNode, documentData));
                break;
            case 'noBreakHyphen':
                result.properties.textContent += nbHyphen;
                break;
            case 'softHyphen':
                result.properties.textContent += enDash;
                break;
            case 'rPr':
                merge(textProperties, parseTextProperties(childNode, documentData));
                break;

            // TODO: parse w:sym. It needs more samples of .docx

            case 't':
                result.properties.textContent += textContent.replace(/\s/g, space);
                break;
            case 'tab':
                result.properties.textContent += tabAsSpaces;
                break;
            case 'pict':
                merge(result, parsePicture(childNode, documentData));
                break;

            default:
            // do nothing
        }
    });

    merge(result, textProperties);
    return result;
}