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
            const element = Document.elementPrototype;
            const localName = node.localName;
            let attrValue;

            if (localName === 'shape') {
                attrValue = node.attributes.style && node.attributes.style.value;
                if (attrValue) {
                    merge(element.style, parseStyleAttribute(
                        {
                            src: attrValue,
                            denominator
                        }
                    ));
                }

                const imageData = node.querySelector('imagedata');

                if (imageData) {
                    attrValue = imageData.attributes['o:title'] && imageData.attributes['o:title'].value;
                    if (attrValue) {
                        element.properties.title = attrValue;
                    }

                    attrValue = imageData.attributes['r:id'] && imageData.attributes['r:id'].value;
                    if (attrValue) {
                        const media = getMediaFromRelationship(attrValue, documentData);

                        if (media) {
                            element.style.backgroundImage = `url('${ media.data }')`;
                            element.style.backgroundRepeat = 'no-repeat';
                        }
                    }
                }

                result.children.push(element);
            } else if (localName === 'rect') {
                attrValue = node.attributes.style && node.attributes.style.value;
                if (attrValue) {
                    merge(element.style, parseStyleAttribute(
                        {
                            src: attrValue,
                            denominator
                        }
                    ));
                }

                const textBox = node.querySelector('textbox');

                if (textBox) {
                    const textBoxContent = textBox.querySelector('txbxContent');

                    forEach.call(textBoxContent && textBoxContent.childNodes || [], (node) => {
                        if (node.localName === 'p') {
                            element.children.push(parseParagraph({
                                node,
                                documentData
                            }));
                        }
                    });
                }

                result.children.push(element);
            }
        });
    }

    return result;
}