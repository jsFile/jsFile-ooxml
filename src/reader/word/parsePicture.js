import JsFile from 'JsFile';
import getMediaFromRelationship from './getMediaFromRelationship';
import parseParagraph from './parseParagraph';
import parseStyleAttribute from './parseStyleAttribute';
const {Document} = JsFile;
const {merge} = JsFile.Engine;
const denominator = 20;

export default function (node, documentData) {

    // TODO: parse all information about picture. It needs more .docx samples
    const result = Document.elementPrototype;
    if (!node) {
        return result;
    }

    const group = node.querySelector('group');
    let attrValue;
    if (group) {
        attrValue = group.attributes.style && group.attributes.style.value;

        if (attrValue) {
            merge(result.style, parseStyleAttribute({
                src: attrValue
            }));
        }

        Array.prototype.forEach.call(group && group.childNodes || [], (node) => {
            const el = Document.elementPrototype;
            const localName = node.localName;
            let attrValue;

            if (localName === 'shape') {
                attrValue = node.attributes.style && node.attributes.style.value;
                if (attrValue) {
                    merge(el.style, parseStyleAttribute(
                        {
                            src: attrValue,
                            denominator
                        }
                    ));
                }

                let imageData = node.querySelector('imagedata');
                if (imageData) {
                    attrValue = imageData.attributes['o:title'] && imageData.attributes['o:title'].value;
                    if (attrValue) {
                        el.properties.title = attrValue;
                    }

                    attrValue = imageData.attributes['r:id'] && imageData.attributes['r:id'].value;
                    if (attrValue) {
                        let media = getMediaFromRelationship(attrValue, documentData);

                        if (media) {
                            el.style.backgroundImage = `url('${media.data}')`;
                            el.style.backgroundRepeat = 'no-repeat';
                        }
                    }
                }

                result.children.push(el);
            } else if (localName === 'rect') {
                attrValue = node.attributes.style && node.attributes.style.value;
                if (attrValue) {
                    merge(el.style, parseStyleAttribute(
                        {
                            src: attrValue,
                            denominator
                        }
                    ));
                }

                let textBox = node.querySelector('textbox');
                if (textBox) {
                    let node = textBox.querySelector('txbxContent');
                    [].forEach.call(node && node.childNodes || [], function (node) {
                        if (node.localName === 'p') {
                            el.children.push(parseParagraph({
                                node,
                                documentData
                            }));
                        }
                    });
                }

                result.children.push(el);
            }
        });
    }

    return result;
}