import parseParagraph from './parseParagraph';
import parseTable from './parseTable';
import {Document} from 'JsFile';

function parse(params) {
    let listElement;
    const queue = [[]];
    const {nodes = [], documentData = {}} = params;
    const push2Result = function (response) {
        queue[0].push(response[0] || response);
    };

    nodes.forEach((node) => {
        let localName = node.localName;

        if (localName === 'tbl') {
            queue.push(parseTable({
                node,
                documentData,
                parseDocumentContentNodes: parse
            }).then(push2Result));
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
                    push2Result(listElement);
                    listElement = null;
                }

                push2Result(el);
            }
        }
    });

    return Promise.all(queue);
}

export default parse;