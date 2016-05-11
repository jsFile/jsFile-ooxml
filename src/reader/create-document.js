export default function createDocument (...args) {
    if (this.isWordProcessingDocument()) {
        return this.createWordProcessingDocument(...args);
    }

    return Promise.reject(this.errors.invalidFileType);
}