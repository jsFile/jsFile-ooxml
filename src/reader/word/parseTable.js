import JsFile from 'JsFile';
import parseTableProperties from './parseTableProperties';
import parseTableRowProperties from './parseTableRowProperties';
import parseTableColProperties from './parseTableColProperties';
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

    let rowProperties;
    let thead;
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

    forEach.call(node && node.childNodes || [], (node) => {
        const localName = node.localName;

        if (localName === 'tblPr') {
            merge(tableProperties, parseTableProperties(node));
            merge(colProperties, tableProperties.colProperties);
        } else if (localName === 'tblGrid') {
            Array.prototype.forEach.call(node.querySelectorAll('gridCol'), ({attributes}) => {
                const el = Document.elementPrototype;
                const attrValue = attributes['w:w'] && attributes['w:w'].value;

                el.properties.tagName = 'COL';
                if (attrValue) {
                    el.style.width = {
                        value: attrValue / 20,
                        unit: 'pt'
                    };
                }

                table.children.push(el);
            });
        } else if (localName === 'tr') {
            const row = Document.elementPrototype;
            let localColProperties = colProperties;
            row.properties.tagName = 'TR';

            //clear old value
            rowProperties = {};

            forEach.call(node && node.childNodes || [], (node) => {
                const localName = node.localName;

                // TODO: parse tblPrEx (Table Property Exceptions)
                if (localName === 'trPr') {
                    rowProperties = parseTableRowProperties(node);
                    merge(row.style, rowProperties.style);
                    merge(tableProperties, rowProperties.tableProperties);
                    localColProperties = merge({}, localColProperties, rowProperties.colProperties);
                } else if (localName === 'tc') {
                    let cell = Document.elementPrototype;
                    const nodes = [].slice.call(node && node.childNodes || [], 0);
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