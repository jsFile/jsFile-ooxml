import JsFile from 'JsFile';
import OoxmlEngine from './../../dist/jsfile-ooxml.js';

describe('jsfile-ooxml', () => {
    let files = window.files;

    it('should exist', () => {
        assert.isFunction(OoxmlEngine);
    });
});