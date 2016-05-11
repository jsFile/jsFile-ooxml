import getRelationship from './get-relationship';

/**
 *
 * @param relationId
 * @param documentData
 * @returns {*}
 */
export default function getMediaFromRelationship (relationId, documentData = {}) {
    const relationship = getRelationship(relationId, documentData);

    return (relationship && documentData.media && documentData.media[`word/${ relationship.target }`]) || null;
}