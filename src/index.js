import JsFile from 'JsFile';
import createDocument from './reader/create-document';
import createWordProcessingDocument from './reader/word/create-document';

import './polyfill';

const {Engine} = JsFile;
const wordProcessingFiles = {
    extension: ['docx'],
    mime: ['vnd.openxmlformats-officedocument.wordprocessingml.document']
};

/**
 * @description Supported files by engine
 * @type {{extension: Array, mime: Array}}
 */
const files = {
    extension: [],
    mime: []
};

[wordProcessingFiles].forEach(({extension, mime}) => {
    files.extension.push.apply(files.extension, extension);
    files.mime.push.apply(files.mime, mime);
});

class OoxmlEngine extends Engine {
    constructor (...args) {
        super(...args);
        this.createDocument = createDocument;
        this.createWordProcessingDocument = createWordProcessingDocument;
        this.parser = 'readArchive';
        this.files = files;
    }

    isWordProcessingDocument () {
        return Boolean(this.file && Engine.validateFile(this.file, wordProcessingFiles));
    }

    static test (file) {
        return Boolean(file && Engine.validateFile(file, files));
    }
}

OoxmlEngine.mimeTypes = files.mime.slice(0);

export default OoxmlEngine;