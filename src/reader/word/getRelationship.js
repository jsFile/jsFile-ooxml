/**
 *
 * @param relationId
 * @param documentData
 * @returns {*}
 */
export default function getRelationship (relationId, documentData = {}) {
    const relationships = documentData.relationships || {};

    return relationships.document[relationId] || relationships.main[relationId];
}