/**
 *
 * @description Parse info about relations between files
 * @param xml
 * @return {*}
 * @private
 */
export default function parseRelationships (xml) {
    const result = {};

    Array.prototype.forEach.call((xml && xml.querySelectorAll('Relationship')) || [], ({attributes = {}}) => {
        const idAttribute = attributes.Id;
        const typeAttribute = attributes.Type;
        const targetAttribute = attributes.Target;

        if (idAttribute && typeAttribute && targetAttribute) {
            result[idAttribute.value] = {
                id: idAttribute.value || '',
                type: typeAttribute.value || '',
                target: targetAttribute.value || ''
            };
        }
    });

    return result;
}