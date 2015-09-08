import JsFile from 'JsFile';
const {dom: $, attributeToBoolean, formatPropertyName} = JsFile.Engine;

export default function (node = {}, documentData = {}) {
    let attrValue;
    let height = 0;
    const properties = {};
    const style = {};

    $.children(node).forEach(({localName, attributes}) => {
        switch (localName) {
            case 'pgSz':
                attrValue = attributes['w:w'] && attributes['w:w'].value;
                if (!isNaN(attrValue)) {
                    style.width = {
                        value: attrValue / 20,
                        unit: 'pt'
                    };
                }

                attrValue = attributes['w:h'] && attributes['w:h'].value;
                if (!isNaN(attrValue)) {
                    style.height = {
                        value: attrValue / 20,
                        unit: 'pt'
                    };

                    height += style.height.value;
                }

                break;
            case 'pgMar':
                attrValue = attributes['w:top'] && attributes['w:top'].value;
                if (!isNaN(attrValue)) {
                    style.paddingTop = {
                        value: attrValue / 20,
                        unit: 'pt'
                    };

                    height -= style.paddingTop.value;
                }

                attrValue = attributes['w:left'] && attributes['w:left'].value;
                if (!isNaN(attrValue)) {
                    style.paddingLeft = {
                        value: attrValue / 20,
                        unit: 'pt'
                    };
                }

                attrValue = attributes['w:right'] && attributes['w:right'].value;
                if (!isNaN(attrValue)) {
                    style.paddingRight = {
                        value: attrValue / 20,
                        unit: 'pt'
                    };
                }

                attrValue = attributes['w:bottom'] && attributes['w:bottom'].value;
                if (!isNaN(attrValue)) {
                    style.paddingBottom = {
                        value: attrValue / 20,
                        unit: 'pt'
                    };

                    height -= style.paddingBottom.value;
                }

                attrValue = attributes['w:header'] && attributes['w:header'].value;
                if (properties.pageNumber && !isNaN(attrValue)) {
                    properties.header = properties.header || {};
                    properties.header.style.height = {
                        value: attrValue / 20,
                        unit: 'pt'
                    };
                }

                attrValue = attributes['w:footer'] && attributes['w:footer'].value;
                if (!isNaN(attrValue.value)) {
                    properties.footer = properties.footer || {};
                    properties.footer.style.height = {
                        value: attrValue / 20,
                        unit: 'pt'
                    };
                }

                attrValue = attributes['w:gutter'] && attributes['w:gutter'].value;
                if (!isNaN(attrValue.value)) {
                    style.marginTop = {
                        value: attrValue / 20,
                        unit: 'pt'
                    };
                }

                break;
            case 'pgNumType':
                attrValue = attributes['w:start'] && attributes['w:start'].value;
                properties.pageNumber = {
                    value: 0,
                    start: !isNaN(attrValue) ? Number(attrValue) : 1
                };
                break;
            case 'cols':
                properties.cols = properties.cols || {};
                properties.cols.equalWidth = attributeToBoolean(attributes['w:equalWidth']);
                properties.cols.separated = attributeToBoolean(attributes['w:sep']);

                attrValue = attributes['w:num'] && attributes['w:num'].value;
                properties.cols.number = !isNaN(attrValue) ? Number(attrValue) : properties.cols.number;

                attrValue = attributes['w:space'] && attributes['w:space'].value;
                properties.cols.space = !isNaN(attrValue) ? {
                    value: attrValue / 20,
                    unit: 'pt'
                } : properties.cols.space;
                break;
            case 'docGrid':
                attrValue = attributes['w:linePitch'] && attributes['w:linePitch'].value;
                if (!isNaN(attrValue.value)) {
                    documentData.styles.defaults.linePitch = {
                        value: attrValue / 20,
                        unit: 'pt'
                    };
                }
                break;
        }
    });

    Array.prototype.forEach.call(attributes, function ({name, value}) {
        if (value) {
            properties[formatPropertyName(name)] = isNaN(value) ? value : Number(value);
        }
    });

    return {
        properties,
        style
    };
}