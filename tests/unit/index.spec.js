import chai from 'chai';
import chaiJsonSchema from 'chai-json-schema';
import schemas from 'jsfile-schemas';
import JsFile from 'JsFile';
import OoxmlEngine from './../../dist/jsfile-ooxml.js';

chai.use(chaiJsonSchema);
const assert = chai.assert;

describe('jsFile-ooxml', () => {
    let files;
    const documentSchema = schemas.document;

    before(() => {
        files = window.files;
    });

    it('should exist', () => {
        assert.isFunction(TxtEngine);
    });

    it('should read the file', () => {
        const queue = [];
        for (let name in files) {
            if (files.hasOwnProperty(name)) {
                const jf = new JsFile(files[name], {
                    workerPath: '/base/dist/workers/'
                });
                const promise = jf.read()
                    .then(done, done);

                queue.push(promise);

                function done (result) {
                    assert.instanceOf(result, JsFile.Document, name);
                    const json = result.json();
                    assert.jsonSchema(json, documentSchema, name);
                    assert.notEqual(json.length, 0, `File ${name} shouldn't be empty`);
                }
            }
        }

        return Promise.all(queue);
    });
});