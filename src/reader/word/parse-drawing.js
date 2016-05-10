import JsFile from 'JsFile';
import getMediaFromRelationship from './get-media-from-relationship';
import convertEmu from './convert-emu';
const {Document} = JsFile;
const {formatPropertyName, attributeToBoolean} = JsFile.Engine;

export default function parseDrawing (node, documentData) {
    let result = Document.elementPrototype;
    let attrValue;
    let childNode = node.querySelector('prstGeom');
    const extents = {};
    const inline = {
        extent: {},
        effectExtent: {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        }
    };

    // const shapeType = (childNode && childNode.attributes.prst && childNode.attributes.prst.value) || '';
    const forEach = [].forEach;

    result.properties.tagName = 'IMG';
    childNode = node.querySelector('blip');
    attrValue = childNode && childNode.attributes['r:embed'] && childNode.attributes['r:embed'].value;
    if (attrValue) {
        const media = getMediaFromRelationship(attrValue, documentData);
        if (media) {
            result.properties.src = media.data;
        }
    }

    childNode = node.querySelector('off');
    attrValue = childNode && childNode.attributes.y && childNode.attributes.y.value;
    if (!isNaN(attrValue)) {
        result.style.marginTop = {
            value: Number(attrValue),
            unit: 'pt'
        };
    }

    attrValue = childNode && childNode.attributes.x && childNode.attributes.x.value;
    if (!isNaN(attrValue)) {
        result.style.marginLeft = {
            value: Number(attrValue),
            unit: 'pt'
        };
    }

    childNode = node.querySelector('positionH');
    if (childNode) {
        const offset = childNode.querySelector('posOffset');
        if (offset && offset.textContent) {
            result.style.position = 'relative';
            result.style.left = convertEmu(offset.textContent);
        }
    }

    childNode = node.querySelector('positionV');
    if (childNode) {
        const offset = childNode.querySelector('posOffset');
        if (offset && offset.textContent) {
            result.style.position = 'relative';
            result.style.top = convertEmu(offset.textContent);
        }
    }

    childNode = node.querySelector('ext');
    attrValue = childNode && childNode.attributes.y && childNode.attributes.y.value;
    if (!isNaN(attrValue)) {
        extents.top = {
            value: Number(attrValue),
            unit: 'pt'
        };
    }

    attrValue = childNode && childNode.attributes.x && childNode.attributes.x.value;
    if (!isNaN(attrValue)) {
        extents.left = {
            value: Number(attrValue),
            unit: 'pt'
        };
    }

    childNode = node.querySelector('inline');
    if (childNode) {
        forEach.call(childNode.attributes || [], function (attr) {
            let value = attr.value;

            if (value) {
                result.properties.inline = result.properties.inline || {};
                result.properties.inline[formatPropertyName(attr.name)] = isNaN(value) ? value : Number(value);
            }
        });

        childNode = childNode.querySelector('blipFill blip');
        if (childNode) {
            attrValue = childNode.attributes['r:embed'] && childNode.attributes['r:embed'].value;
            const rel = attrValue && documentData.relationships && documentData.relationships.document[attrValue];
            if (rel) {
                for (let k in documentData.media) {
                    if (documentData.media.hasOwnProperty(k) && k.indexOf(rel.target) >= 0) {
                        result.properties.src = documentData.media[k].data;
                        break;
                    }
                }
            }
        }

        childNode = node.querySelector('docPr');
        attrValue = childNode && childNode.attributes.id && childNode.attributes.id.value;
        if (attrValue) {
            result.properties.id = attrValue;
        }

        attrValue = childNode && childNode.attributes.name && childNode.attributes.name.value;
        if (attrValue) {
            result.properties.name = attrValue;
        }

        if (attributeToBoolean(childNode.attributes.hidden)) {
            result.style.visibility = 'hidden';
        }

        attrValue = childNode && childNode.attributes.descr && childNode.attributes.descr.value;
        if (attrValue) {
            result.properties.alt = attrValue;
        }

        // TODO: parse childNode = node.querySelector('extent');
        childNode = node.querySelector('effectExtent');
        forEach.call((childNode && childNode.attributes) || [], function (attr) {
            const value = attr.value;
            if (value) {
                const attrName = formatPropertyName(attr.name);
                switch (attrName) {
                    case 'l':
                        if (!isNaN(value)) {
                            result.style.left = {
                                value: Number(value),
                                unit: 'emu'
                            };
                        }

                        break;
                    case 'r':
                        if (!isNaN(value)) {
                            result.style.right = {
                                value: Number(value),
                                unit: 'emu'
                            };
                        }

                        break;
                    case 'b':
                        if (!isNaN(value)) {
                            result.style.bottom = {
                                value: Number(value),
                                unit: 'emu'
                            };
                        }

                        break;
                    case 'top':
                        if (!isNaN(value)) {
                            result.style.top = {
                                value: Number(value),
                                unit: 'emu'
                            };
                        }

                        break;
                    default:
                        inline.effectExtent[attrName] = value;
                }
            }
        });
    }

    // TODO: parse inline, extents objects and shapeType property
    return result;
}