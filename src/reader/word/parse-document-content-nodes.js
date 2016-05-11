import parseParagraph from './parse-paragraph';
import parseTable from './parse-table';
import JsFile from 'JsFile';

const {Document} = JsFile;

function parse (params) {
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
            const element = parseParagraph({node, documentData});
            const isListItem = element.properties.tagName === 'LI';

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

                listElement.children.push(element);
            } else {
                if (listElement) {
                    queue.push(listElement);
                    listElement = null;
                }

                queue.push(element);
            }
        }
    });

    return Promise.all(queue);
}

export default parse;