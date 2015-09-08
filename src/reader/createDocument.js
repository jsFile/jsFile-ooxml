import createWordProcessingDocument from './word/createDocument';

export default function (data) {
    if (this.isWordProcessingDocument()) {
        return createWordProcessingDocument.apply(this, arguments);
    }

    return Promise.reject(this.errors.invalidFileType);
};