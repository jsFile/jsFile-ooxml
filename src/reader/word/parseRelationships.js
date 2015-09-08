/**
 *
 * @description Parse info about relations between files
 * @param xml
 * @return {*}
 * @private
 */
export default function (xml) {
    let result = {};

    Array.prototype.forEach.call((xml && xml.querySelectorAll('Relationship')) || [], (node) => {
        let attrs = node.attributes || {},
            idAttribute = attrs.Id,
            typeAttribute = attrs.Type,
            targetAttribute = attrs.Target;

        if (idAttribute && typeAttribute && targetAttribute) {
            result[idAttribute.value] = {
                id: idAttribute.value || '',
                type: typeAttribute.value || '',
                target: targetAttribute.value || ''
            };
        }
    });

    return result;
};