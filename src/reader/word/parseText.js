import JsFile from 'JsFile';
import parseTextProperties from './parseTextProperties';
import parseDrawing from './parseDrawing';
import parsePicture from './parsePicture';
const {Document} = JsFile;
const {merge, clone, formatPropertyName, nbHyphen, enDash, space, tabAsSpaces} = JsFile.Engine;

export default function (params = {}) {
    const {node, documentData, style} = params;
    const result = Document.elementPrototype;

    if (!node || !documentData) {
        return result;
    }

    const forEach = [].forEach;
    const textProperties = clone(documentData.styles.defaults.textProperties);
    forEach.call((node && node.attributes) || [], ({value, name}) => {
        textProperties[formatPropertyName(name)] = isNaN(value) ? value : Number(value);
    });

    forEach.call(node && node.childNodes || [], ({textContent, localName, attributes}) => {
        let el;

        switch (localName) {
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
                result.properties.textContent = result.properties.textContent || '';
                result.properties.textContent += nbHyphen;
                break;
            case 'softHyphen':
                result.properties.textContent = result.properties.textContent || '';
                result.properties.textContent += enDash;
                break;
            case 'rPr':
                merge(textProperties, parseTextProperties(node, documentData));
                break;

            // TODO: parse w:sym. It needs more samples of .docx

            case 't':
                result.properties.textContent = result.properties.textContent || '';
                result.properties.textContent += ((textContent) || '').replace(/\s/g, space);
                break;
            case 'tab':
                result.properties.textContent = result.properties.textContent || '';
                result.properties.textContent += tabAsSpaces;
                break;
            case 'pict':
                merge(result, parsePicture(node, documentData));
                break;
        }
    });

    merge(result.style, textProperties.style, style);
    return result;
}