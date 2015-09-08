import $ from './../../../../core/dom/index';
import attributeToBoolean from './../../../../core/engine/src/attributeToBoolean';

/**
 * @description Parsing document web settings
 * @param xml
 * @return {Object}
 * @private
 */
export default function (xml) {
    let result = {};

    $.children(xml && xml.querySelector('webSettings')).forEach(function (node) {
        result[node.localName] = attributeToBoolean(node.attributes['w:val']);
    });

    return result;
};