import parseParagraph from './parseParagraph';
import parseTable from './parseTable';
import Document from './../../../../core/document/index';

function parse(params) {
    let listElement,
        queue = [[]],
        push2Result = function (response) {
            queue[0].push(response[0] || response);
        },
        {nodes = [], documentData = {}} = params;

    nodes.forEach(node => {
        let localName = node.localName;

        if (localName === 'tbl') {
            queue.push(parseTable({
                node,
                documentData,
                parseDocumentContentNodes: parse
            }).then(push2Result));
        } else if (localName === 'p') {
            let el = parseParagraph({node, documentData}),
                isListItem = el.properties.tagName === 'LI';

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

                if (el.style.paddingLeft) {
                    listElement.style.paddingLeft = el.style.paddingLeft;
                    delete el.style.paddingLeft;
                }

                if (el.style.marginLeft) {
                    listElement.style.marginLeft = el.style.marginLeft;
                    delete el.style.marginLeft;
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