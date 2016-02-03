import JsFile from 'JsFile';
import parseTextProperties from './parseTextProperties';
import parseDrawing from './parseDrawing';
import parsePicture from './parsePicture';
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

    forEach.call(node && node.childNodes || [], (node) => {
        let el;
        const {textContent = '', attributes} = node;

        switch (node.localName) {
            case 'cr':
                el = Document.elementPrototype;
                el.properties.tagName = 'BR';
                result.children.push(el);
                break;
            case 'br':
                const type = attributes['w:type'] && attributes['w:type'].value;
                const clear = attributes['w:clear'] && attributes['w:clear'].value;

                if (!type || type === 'textWrapping') {
                    el = Document.elementPrototype;

                    if (!clear || clear === 'none' || clear === 'all') {
                        el.properties.tagName = 'BR';
                    }

                    result.children.push(el);
                }

                // TODO: parse types 'column' & 'page', parse clear 'left' & 'right'
                break;
            case 'drawing':
                merge(result, parseDrawing(node, documentData));
                break;
            case 'noBreakHyphen':
                result.properties.textContent += nbHyphen;
                break;
            case 'softHyphen':
                result.properties.textContent += enDash;
                break;
            case 'rPr':
                merge(textProperties, parseTextProperties(node, documentData));
                break;

            // TODO: parse w:sym. It needs more samples of .docx

            case 't':
                result.properties.textContent += textContent.replace(/\s/g, space);
                break;
            case 'tab':
                result.properties.textContent += tabAsSpaces;
                break;
            case 'pict':
                merge(result, parsePicture(node, documentData));
                break;
        }
    });

    merge(result, textProperties);
    return result;
}