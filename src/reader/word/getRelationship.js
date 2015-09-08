/**
 *
 * @param relationId
 * @param documentData
 * @returns {*}
 */
export default function (relationId, documentData = {}) {
    let relationships = documentData.relationships || {};

    return relationships.document[relationId] || relationships.main[relationId];
};