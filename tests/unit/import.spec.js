import OoxmlEngine from './../../src/index';

describe('jsFile-ooxml', () => {
    describe('Library imports', () => {
        it('should import JS module', () => {
            assert.isFunction(OoxmlEngine);
        });

        it('should exist in global scope', () => {
            assert.isFunction(window.JsFileOoxml.default);
        });
    });
});