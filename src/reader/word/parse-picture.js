import JsFile from 'JsFile';
import getMediaFromRelationship from './get-media-from-relationship';
import parseParagraph from './parse-paragraph';
import parseStyleAttribute from './parse-style-attribute';
const {Document} = JsFile;
const {merge} = JsFile.Engine;
const denominator = 20;

export default function parsePicture (node, documentData) {

    // TODO: parse all information about picture. It needs more .docx samples
    const result = Document.elementPrototype;
    if (!node) {
        return result;
    }

    const forEach = [].forEach;
    const group = node.querySelector('group');
    let attrValue;
    if (group) {
        attrValue = group.attributes.style && group.attributes.style.value;

        if (attrValue) {
            merge(result.style, parseStyleAttribute({
                src: attrValue
            }));
        }

        forEach.call(group.childNodes || [], (node) => {
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
                    let textBoxContent = textBox.querySelector('txbxContent');

                    forEach.call(textBoxContent && textBoxContent.childNodes || [], (node) => {
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