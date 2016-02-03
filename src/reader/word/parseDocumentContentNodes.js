import parseParagraph from './parseParagraph';
import parseTable from './parseTable';
import JsFile from 'JsFile';

const {Document} = JsFile;

function parse(params) {
    let listElement;
    const queue = [];
    const {nodes = [], documentData = {}} = params;

    nodes.forEach((node) => {
        const localName = node.localName;

        if (localName === 'tbl') {
            queue.push(parseTable({
                node,
                documentData,
                parseDocumentContentNodes: parse
            }));
        } else if (localName === 'p') {
            const el = parseParagraph({node, documentData});
            const isListItem = el.properties.tagName === 'LI';

            // if it's a list item
            if (isListItem) {
                if (!listElement) {
                    listElement = Document.elementPrototype;
                    listElement.properties.tagName = 'UL';
                    listElement.style.padding = {
                        value: 0,
                        unit: 'pt'
                    };
                    listElement.style.margin = {
                        value: 0,
                        unit: 'pt'
                    };
                }

                listElement.children.push(el);
            } else {
                if (listElement) {
                    queue.push(listElement);
                    listElement = null;
                }

                queue.push(el);
            }
        }
    });

    return Promise.all(queue);
}

export default parse;