import {Engine, defineEngine} from 'JsFile';
import createDocument from './reader/createDocument';

/**
 * @description Supported files by engine
 * @type {{extension: Array, mime: Array}}
 */
const files = {
    extension: ['docx'],
    mime: ['vnd.openxmlformats-officedocument.wordprocessingml.document']
};

class OoxmlEngine extends Engine {
    createDocument = createDocument

    parser = 'parseFromArchive'

    files = files

    isWordProcessingDocument () {

    }

    static mimeTypes = files.mime.slice(0)
}

defineEngine(OoxmlEngine);

export default OoxmlEngine;