import $ from './../../../../core/dom/index';
import formatPropertyName from './../../../../core/engine/src/formatPropertyName';

/**
 *
 * @description Parsing information about fonts
 * @param xml
 * @return {Object}
 * @private
 */
export default function (xml) {
    let result = {};

    Array.prototype.forEach.call((xml && xml.querySelectorAll('font')) || [], function (node) {
        let name = node.attributes['w:name'] && node.attributes['w:name'].value;

        if (name) {
            result[name] = {};
            
            $.children(node).forEach(function (node) {
                let attrValue,
                    localName = node.localName;

                if (localName === 'sig') {
                    result[name][localName] = {};

                    Array.prototype.forEach.call(node.attributes || [], function (attr) {
                        result[name][localName][formatPropertyName(attr.name)] = attr.value;
                    });
                } else {
                    attrValue = node.attributes['w:val'] && node.attributes['w:val'].value;
                    result[name][localName] = attrValue;
                }
            });
        }
    });

    return result;
};