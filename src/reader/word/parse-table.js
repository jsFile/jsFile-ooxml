import JsFile from 'JsFile';
import parseTableProperties from './parse-table-properties';
import parseTableRowProperties from './parse-table-row-properties';
import parseTableColProperties from './parse-table-col-properties';
const {Document} = JsFile;
const {merge, clone} = JsFile.Engine;

/**
 *
 * @param params
 * @returns {*}
 */
export default (params) => {
    const {node, documentData, parseDocumentContentNodes} = params;

    if (!node || !documentData) {
        return Promise.reject();
    }

    let rowProperties = null;
    let thead = null;
    const queue = [];
    const forEach = [].forEach;
    const tbody = Document.elementPrototype;
    const table = Document.elementPrototype;
    const tableProperties = {
        style: {},
        properties: documentData.styles.defaults.tableProperties &&
        clone(documentData.styles.defaults.tableProperties.properties) || {}
    };
    const colProperties = clone(tableProperties.colProperties);

    table.properties.tagName = 'TABLE';
    tbody.properties.tagName = 'TBODY';

    forEach.call(node && node.childNodes || [], (childNode) => {
        const {localName} = childNode;

        if (localName === 'tblPr') {
            merge(tableProperties, parseTableProperties(childNode));
            merge(colProperties, tableProperties.colProperties);
        } else if (localName === 'tblGrid') {
            Array.prototype.forEach.call(childNode.querySelectorAll('gridCol'), ({attributes}) => {
                const element = Document.elementPrototype;
                const attrValue = attributes['w:w'] && attributes['w:w'].value;

                element.properties.tagName = 'COL';
                if (attrValue) {
                    element.style.width = {
                        value: attrValue / 20,
                        unit: 'pt'
                    };
                }

                table.children.push(element);
            });
        } else if (localName === 'tr') {
            const row = Document.elementPrototype;
            let localColProperties = colProperties;

            row.properties.tagName = 'TR';

            // clear old value
            rowProperties = {};

            forEach.call(childNode && childNode.childNodes || [], (greatChildNode) => {
                const {localName} = greatChildNode;

                // TODO: parse tblPrEx (Table Property Exceptions)
                if (localName === 'trPr') {
                    rowProperties = parseTableRowProperties(greatChildNode);
                    merge(row.style, rowProperties.style);
                    merge(tableProperties, rowProperties.tableProperties);
                    localColProperties = merge({}, localColProperties, rowProperties.colProperties);
                } else if (localName === 'tc') {
                    let cell = Document.elementPrototype;
                    const nodes = [].slice.call(greatChildNode && greatChildNode.childNodes || [], 0);

                    cell.properties.tagName = 'TD';

                    if (nodes[0]) {
                        if (nodes[0].localName === 'tcPr') {
                            localColProperties = merge({}, localColProperties, parseTableColProperties(nodes.shift()));
                        }

                        queue.push(parseDocumentContentNodes({
                            nodes,
                            documentData
                        }).then((elements) => {
                            cell.children.push.apply(cell.children, elements);
                            cell = null;
                        }));
                    }

                    merge(cell.style, localColProperties.style);
                    merge(cell.properties, localColProperties.properties);
                    row.children.push(cell);
                }
            });

            if (rowProperties.tblHeader) {
                if (!thead) {
                    thead = Document.elementPrototype;
                    thead.properties.tagName = 'THEAD';
                }

                thead.children.push(row);
            } else {
                tbody.children.push(row);
            }
        }
    });

    merge(table.style, tableProperties.style);
    merge(table.properties, tableProperties.properties);
    if (thead) {
        table.children.push(thead);
    }

    table.children.push(tbody);
    return Promise.all(queue).then(() => table);
};