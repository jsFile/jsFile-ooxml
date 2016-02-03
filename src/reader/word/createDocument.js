import JsFile from 'JsFile';
import parseRelationships from './parseRelationships';
import parseApplicationInfo from './parseApplicationInfo';
import parseDocumentInfo from './parseDocumentInfo';
import parseFontsInfo from './parseFontsInfo';
import parseWebSettings from './parseWebSettings';
import parseDocumentSettings from './parseDocumentSettings';
import parseDocumentThemes from './parseDocumentThemes';
import parseDocumentStyles from './parseDocumentStyles';
import parseDocumentContent from './parseDocumentContent';
const {normalizeDataUri} = JsFile.Engine;

/**
 *
 * @param filesEntry {Array}
 * @private
 */
export default function createDocument (filesEntry) {
    const queue = [];
    const fileName = this.fileName;
    const domParser = new DOMParser();
    let documentData = {
        media: {},
        relationships: {},
        appInfo: {},
        documentInfo: {},
        fonts: {},
        settings: {},
        styles: {},
        webSettings: {},
        themes: {}
    };
    let document;

    filesEntry.forEach(function (fileEntry) {
        if (!fileEntry.file) {
            return;
        }

        let method;
        const filename = fileEntry.entry.filename;
        let isMediaSource = Boolean(filename && (filename.includes('media/')));
        if (isMediaSource) {
            method = 'readAsDataURL';
        }

        queue.push(this.readFileEntry({
            file: fileEntry.file,
            method
        }).then((result) => {
            let xml;
            if (isMediaSource) {
                documentData.media[filename] = {
                    fileData: fileEntry,
                    data: normalizeDataUri(result, filename)
                };
            } else {
                xml = domParser.parseFromString(result, 'application/xml');
                if (filename.includes('_rels/.rels')) {
                    documentData.relationships.main = parseRelationships(xml);
                } else if (filename.includes('word/_rels/document')) {
                    documentData.relationships.document = parseRelationships(xml);
                } else if (filename.includes('word/_rels/fontTable')) {
                    documentData.relationships.fonts = parseRelationships(xml);
                } else if (filename.includes('word/_rels/numbering')) {
                    documentData.relationships.numbering = parseRelationships(xml);
                } else if (filename.includes('/app.xml')) {
                    documentData.applicationInfo = parseApplicationInfo(xml);
                } else if (filename.includes('/core.xml')) {
                    documentData.documentInfo = parseDocumentInfo(xml);
                } else if (filename.includes('/fontTable.xml')) {
                    documentData.fonts = parseFontsInfo(xml);
                } else if (filename.includes('theme/')) {
                    documentData.themes[filename] = parseDocumentThemes(xml);
                } else if (filename.includes('/settings.xml')) {
                    documentData.settings = parseDocumentSettings(xml);
                } else if (filename.includes('/webSettings.xml')) {
                    documentData.webSettings = parseWebSettings(xml);
                } else if (filename.includes('/styles.xml')) {
                    documentData.styles = parseDocumentStyles(xml);
                } else if (filename.includes('/document.xml')) {
                    document = xml;
                }
            }
        }));
    }, this);

    return Promise.all(queue).then(() => {
        const result = parseDocumentContent({
            xml: document,
            documentData,
            fileName
        });

        documentData = null;
        document = null;

        return result;
    });
}