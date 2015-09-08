import getRelationship from './getRelationship';

/**
 *
 * @param relationId
 * @param documentData
 * @returns {*}
 */
export default function (relationId, documentData = {}) {
    let relationship = getRelationship(relationId, documentData);

    return (relationship && documentData.media && documentData.media['word/' + relationship.target]) || null;
};