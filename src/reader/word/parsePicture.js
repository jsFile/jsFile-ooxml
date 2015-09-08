import Document from './../../../../core/document/index';
import merge from './../../../../core/jdoc/helpers/merge';
import $ from './../../../../core/dom/index';
import getMediaFromRelationship from './getMediaFromRelationship';
import parseParagraph from './parseParagraph';
import parseStyleAttribute from './parseStyleAttribute';

const denominator = 20;

export default function (node, documentData) {
    // TODO: parse all information about picture. It needs more .docx samples

    let group,
        attrValue,
        result = Document.elementPrototype;
    
    if (!node) {
        return result;
    }

    group = node.querySelector('group');

    if (group) {
        attrValue = group.attributes.style && group.attributes.style.value;

        if (attrValue) {
            merge(result.style, parseStyleAttribute({
                src: attrValue
            }));
        }

        $.children(group).forEach(function (node, i) {
            let el = Document.elementPrototype,
                localName = node.localName,
                attrValue;

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
                            el.style.backgroundImage = 'url('' + media.data + '')';
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

                    $.children(textBoxContent).forEach(function (node) {
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