import {Engine, defineEngine} from 'JsFile';
import createDocument from './reader/createDocument';

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
    createDocument = createDocument

    parser = 'readArchive'

    files = files

    isWordProcessingDocument () {
        return Boolean(this.file && Engine.validateFile(this.file, wordProcessingFiles));
    }

    static test (file) {
        return Boolean(file && Engine.validateFile(file, files));
    }

    static mimeTypes = files.mime.slice(0)
}

defineEngine(OoxmlEngine);

export default OoxmlEngine;