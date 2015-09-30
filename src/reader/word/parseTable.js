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
    const forEach = [].forEach;
    const tbody = Document.elementPrototype;
    const queue = [Document.elementPrototype];
    const tableProperties = {
        style: {},
        properties: documentData.styles.defaults.tableProperties &&
            clone(documentData.styles.defaults.tableProperties.properties) || {}
    };
    const colProperties = clone(tableProperties.colProperties);
    queue[0].properties.tagName = 'TABLE';
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

                queue[0].children.push(el);
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
                    const col = Document.elementPrototype;
                    const nodes = [].slice.call(node && node.childNodes || [], 0);
                    col.properties.tagName = 'TD';

                    if (nodes[0]) {
                        if (nodes[0].localName === 'tcPr') {
                            localColProperties = merge({}, localColProperties, parseTableColProperties(nodes.shift()));
                        }

                        queue.push(parseDocumentContentNodes({
                            nodes,
                            documentData
                        }).then(response => col.children = response[0][0]));
                    }

                    merge(col.style, localColProperties.style);
                    merge(col.properties, localColProperties.properties);
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

    merge(queue[0].style, tableProperties);
    if (thead) {
        queue[0].children.push(thead);
    }

    queue[0].children.push(tbody);
    return Promise.all(queue);
};