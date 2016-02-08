import chai from 'chai';
import chaiJsonSchema from 'chai-json-schema';
import schemas from 'jsfile-schemas';
import JsFile from 'JsFile';
import OoxmlEngine from './../../src/index';

chai.use(chaiJsonSchema);
const assert = chai.assert;

describe('jsFile-ooxml', () => {
    let files;
    const documentSchema = schemas.document;

    before(() => {
        files = window.files;
        JsFile.defineEngine(OoxmlEngine);
    });

    it('should read the file', function () {
        this.timeout(15000);
        const queue = [];
        for (let name in files) {
            if (files.hasOwnProperty(name)) {
                (function (file, name) {
                    const jf = new JsFile(file, {
                        workerPath: '/base/dist/workers/'
                    });
                    const promise = jf.read()
                        .then(done, done);

                    queue.push(promise);

                    function done (result) {
                        assert.instanceOf(result, JsFile.Document, name);
                        const json = result.json();
                        const html = result.html();
                        const text = html.textContent || '';
                        assert.jsonSchema(json, documentSchema, name);
                        assert.notEqual(text.length, 0, `File ${name} shouldn't be empty`);
                        assert.notEqual(result.name.length, 0, `Engine should parse a name of file ${name}`);
                    }
                }(files[name], name));
            }
        }

        return Promise.all(queue);
    });
});
