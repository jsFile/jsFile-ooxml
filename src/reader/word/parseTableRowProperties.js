import normalizeSideValue from './normalizeSideValue';

export default function parseTableRowProperties (node) {
    const result = {
        style: {}
    };

    [].forEach.call(node && node.childNodes || [], (node) => {
        let attrValue;
        const localName = node.localName;

        switch (localName) {
            case 'jc':
                attrValue = normalizeSideValue(node.attributes['w:val'] && node.attributes['w:val'].value);
                if (attrValue) {
                    result.style.textAlign = attrValue;
                }

                break;
            case 'cantSplit':
                result.cantSplit = true;
                break;
            case 'hidden':
                result.style.display = 'none';
                break;
            case 'tblCellSpacing':
                attrValue = Number(node.attributes['w:w'] && node.attributes['w:w'].value);
                const type = node.attributes['w:type'] && node.attributes['w:type'].value;
                if (attrValue && !isNaN(attrValue)) {
                    result.tableProperties = result.tableProperties || {
                        style: {}
                    };
                    result.tableProperties.style.borderCollapse = 'separate';
                    result.tableProperties.style.borderSpacing = {
                        unit: 'pt',
                        value: attrValue / (type === 'nil' ? 1 : 20)
                    };
                }

                break;
            case 'tblHeader':
                attrValue = node.attributes['w:val'] && node.attributes['w:val'].value;
                if (attrValue !== 'false') {
                    result.tblHeader = true;
                }

                break;
        }
    });

    return result;
}