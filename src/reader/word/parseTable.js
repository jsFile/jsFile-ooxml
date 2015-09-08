import $ from './../../../../core/dom/index';
import Document from './../../../../core/document/index';
import merge from './../../../../core/jdoc/helpers/merge';
import clone from './../../../../core/jdoc/helpers/clone';
import parseTableProperties from './parseTableProperties';
import parseTableRowProperties from './parseTableRowProperties';
import parseTableColProperties from './parseTableColProperties';

/**
 *
 * @param params
 * @returns {*}
 */
export default params => {
    let {node, documentData, style, parseDocumentContentNodes} = params,
        tableProperties,
        rowProperties,
        thead,
        colProperties,
        tbody = Document.elementPrototype,
        queue = [Document.elementPrototype];

    queue[0].properties.tagName = 'TABLE';
    tbody.properties.tagName = 'TBODY';

    if (!node || !documentData) {
        return reject();
    }
    tableProperties = clone(documentData.styles.defaults.tableProperties) || {};
    colProperties = clone(tableProperties.colProperties);

    $.children(node).forEach(node => {
        let localName = node.localName;

        if (localName === 'tblPr') {
            merge(tableProperties, parseTableProperties(node));
            merge(colProperties, tableProperties.colProperties);
        } else if (localName === 'tblGrid') {
            Array.prototype.forEach.call(node.querySelectorAll('gridCol'), node => {
                let el = Document.elementPrototype,
                    attrValue = node.attributes['w:w'] && node.attributes['w:w'].value;

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
            let row = Document.elementPrototype,
                localColProperties = colProperties;
            row.properties.tagName = 'TR';

            //clear old value
            rowProperties = {};

            $.children(node).forEach(node => {
                let localName = node.localName;

                // TODO: parse tblPrEx (Table Property Exceptions)
                if (localName === 'trPr') {
                    rowProperties = parseTableRowProperties(node);
                    merge(row.style, rowProperties.style);
                    merge(tableProperties, rowProperties.tableProperties);
                    localColProperties = merge({}, localColProperties, rowProperties.colProperties);
                } else if (localName === 'tc') {
                    let col = Document.elementPrototype,
                        nodes = $.children(node);
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

    merge(queue[0].style, tableProperties.style, style);
    if (thead) {
        queue[0].children.push(thead);
    }

    queue[0].children.push(tbody);

    return Promise.all(queue);
};