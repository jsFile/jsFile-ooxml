import createWordProcessingDocument from './word/create-document';

export default function createDocument () {
    if (this.isWordProcessingDocument()) {
        return createWordProcessingDocument.apply(this, arguments);
    }

    return Promise.reject(this.errors.invalidFileType);
}