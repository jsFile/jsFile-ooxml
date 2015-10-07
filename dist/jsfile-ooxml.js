(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("JsFile"));
	else if(typeof define === 'function' && define.amd)
		define(["JsFile"], factory);
	else if(typeof exports === 'object')
		exports["JsFileOoxml"] = factory(require("JsFile"));
	else
		root["JsFileOoxml"] = factory(root["JsFile"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _JsFile = __webpack_require__(1);

	var _readerCreateDocument = __webpack_require__(2);

	var _readerCreateDocument2 = _interopRequireDefault(_readerCreateDocument);

	var _polyfill = __webpack_require__(36);

	var _polyfill2 = _interopRequireDefault(_polyfill);

	var wordProcessingFiles = {
	    extension: ['docx'],
	    mime: ['vnd.openxmlformats-officedocument.wordprocessingml.document']
	};

	/**
	 * @description Supported files by engine
	 * @type {{extension: Array, mime: Array}}
	 */
	var files = {
	    extension: [],
	    mime: []
	};

	[wordProcessingFiles].forEach(function (_ref) {
	    var extension = _ref.extension;
	    var mime = _ref.mime;

	    files.extension.push.apply(files.extension, extension);
	    files.mime.push.apply(files.mime, mime);
	});

	var OoxmlEngine = (function (_Engine) {
	    _inherits(OoxmlEngine, _Engine);

	    function OoxmlEngine() {
	        _classCallCheck(this, OoxmlEngine);

	        _get(Object.getPrototypeOf(OoxmlEngine.prototype), 'constructor', this).apply(this, arguments);

	        this.createDocument = _readerCreateDocument2['default'];
	        this.parser = 'readArchive';
	        this.files = files;
	    }

	    _createClass(OoxmlEngine, [{
	        key: 'isWordProcessingDocument',
	        value: function isWordProcessingDocument() {
	            return Boolean(this.file && _JsFile.Engine.validateFile(this.file, wordProcessingFiles));
	        }
	    }], [{
	        key: 'test',
	        value: function test(file) {
	            return Boolean(file && _JsFile.Engine.validateFile(file, files));
	        }
	    }, {
	        key: 'mimeTypes',
	        value: files.mime.slice(0),
	        enumerable: true
	    }]);

	    return OoxmlEngine;
	})(_JsFile.Engine);

	(0, _JsFile.defineEngine)(OoxmlEngine);

	exports['default'] = OoxmlEngine;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _wordCreateDocument = __webpack_require__(3);

	var _wordCreateDocument2 = _interopRequireDefault(_wordCreateDocument);

	exports['default'] = function (data) {
	    if (this.isWordProcessingDocument()) {
	        return _wordCreateDocument2['default'].apply(this, arguments);
	    }

	    return Promise.reject(this.errors.invalidFileType);
	};

	;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _JsFile = __webpack_require__(1);

	var _JsFile2 = _interopRequireDefault(_JsFile);

	var _parseRelationships = __webpack_require__(4);

	var _parseRelationships2 = _interopRequireDefault(_parseRelationships);

	var _parseApplicationInfo = __webpack_require__(5);

	var _parseApplicationInfo2 = _interopRequireDefault(_parseApplicationInfo);

	var _parseDocumentInfo = __webpack_require__(6);

	var _parseDocumentInfo2 = _interopRequireDefault(_parseDocumentInfo);

	var _parseFontsInfo = __webpack_require__(7);

	var _parseFontsInfo2 = _interopRequireDefault(_parseFontsInfo);

	var _parseWebSettings = __webpack_require__(8);

	var _parseWebSettings2 = _interopRequireDefault(_parseWebSettings);

	var _parseDocumentSettings = __webpack_require__(9);

	var _parseDocumentSettings2 = _interopRequireDefault(_parseDocumentSettings);

	var _parseDocumentThemes = __webpack_require__(11);

	var _parseDocumentThemes2 = _interopRequireDefault(_parseDocumentThemes);

	var _parseDocumentStyles = __webpack_require__(12);

	var _parseDocumentStyles2 = _interopRequireDefault(_parseDocumentStyles);

	var _parseDocumentContent = __webpack_require__(22);

	var _parseDocumentContent2 = _interopRequireDefault(_parseDocumentContent);

	var normalizeDataUri = _JsFile2['default'].Engine.normalizeDataUri;

	/**
	 *
	 * @param filesEntry {Array}
	 * @private
	 */

	exports['default'] = function (filesEntry) {
	    return new Promise((function (resolve, reject) {
	        var queue = [];
	        var fileName = this.fileName;
	        var domParser = new DOMParser();
	        var documentData = {
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
	        var document = undefined;

	        filesEntry.forEach(function (fileEntry) {
	            if (!fileEntry.file) {
	                return;
	            }

	            var method = undefined;
	            var filename = fileEntry.entry.filename;
	            var isMediaSource = Boolean(filename && filename.includes('media/'));
	            if (isMediaSource) {
	                method = 'readAsDataURL';
	            }

	            queue.push(this.readFileEntry({
	                file: fileEntry.file,
	                method: method
	            }).then((function (result) {
	                var xml = undefined;
	                if (isMediaSource) {
	                    documentData.media[filename] = {
	                        fileData: fileEntry,
	                        data: normalizeDataUri(result, filename)
	                    };
	                } else {
	                    xml = domParser.parseFromString(result, 'application/xml');
	                    if (filename.includes('_rels/.rels')) {
	                        documentData.relationships.main = (0, _parseRelationships2['default'])(xml);
	                    } else if (filename.includes('word/_rels/document')) {
	                        documentData.relationships.document = (0, _parseRelationships2['default'])(xml);
	                    } else if (filename.includes('word/_rels/fontTable')) {
	                        documentData.relationships.fonts = (0, _parseRelationships2['default'])(xml);
	                    } else if (filename.includes('word/_rels/numbering')) {
	                        documentData.relationships.numbering = (0, _parseRelationships2['default'])(xml);
	                    } else if (filename.includes('/app.xml')) {
	                        documentData.applicationInfo = (0, _parseApplicationInfo2['default'])(xml);
	                    } else if (filename.includes('/core.xml')) {
	                        documentData.documentInfo = (0, _parseDocumentInfo2['default'])(xml);
	                    } else if (filename.includes('/fontTable.xml')) {
	                        documentData.fonts = (0, _parseFontsInfo2['default'])(xml);
	                    } else if (filename.includes('theme/')) {
	                        documentData.themes[filename] = (0, _parseDocumentThemes2['default'])(xml);
	                    } else if (filename.includes('/settings.xml')) {
	                        documentData.settings = (0, _parseDocumentSettings2['default'])(xml);
	                    } else if (filename.includes('/webSettings.xml')) {
	                        documentData.webSettings = (0, _parseWebSettings2['default'])(xml);
	                    } else if (filename.includes('/styles.xml')) {
	                        documentData.styles = (0, _parseDocumentStyles2['default'])(xml);
	                    } else if (filename.includes('/document.xml')) {
	                        document = xml;
	                    }
	                }
	            }).bind(this)));
	        }, this);

	        Promise.all(queue).then((function () {
	            (0, _parseDocumentContent2['default'])({
	                xml: document,
	                documentData: documentData,
	                fileName: fileName
	            }).then(function (document) {
	                resolve(document);
	            }, reject);

	            documentData = document = null;
	        }).bind(this), reject);
	    }).bind(this));
	};

	;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	 *
	 * @description Parse info about relations between files
	 * @param xml
	 * @return {*}
	 * @private
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	exports['default'] = function (xml) {
	    var result = {};

	    Array.prototype.forEach.call(xml && xml.querySelectorAll('Relationship') || [], function (_ref) {
	        var _ref$attributes = _ref.attributes;
	        var attributes = _ref$attributes === undefined ? {} : _ref$attributes;

	        var idAttribute = attributes.Id;
	        var typeAttribute = attributes.Type;
	        var targetAttribute = attributes.Target;

	        if (idAttribute && typeAttribute && targetAttribute) {
	            result[idAttribute.value] = {
	                id: idAttribute.value || '',
	                type: typeAttribute.value || '',
	                target: targetAttribute.value || ''
	            };
	        }
	    });

	    return result;
	};

	;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _JsFile = __webpack_require__(1);

	var _JsFile2 = _interopRequireDefault(_JsFile);

	var formatPropertyName = _JsFile2['default'].Engine.formatPropertyName;

	/**
	 *
	 * @description Parsing information about application
	 * @param xml
	 * @private
	 * @return {Object}
	 */

	exports['default'] = function (xml) {
	    var result = {};
	    var node = xml && xml.querySelector('Properties');

	    [].forEach.call(node && node.childNodes || [], function (node) {
	        var value = undefined;
	        var textContent = node.textContent || '';
	        var localName = (node.localName || '').split('');
	        var name = formatPropertyName(localName);

	        // convert to number
	        if (!isNaN(textContent)) {
	            value = Number(textContent);
	        } else {
	            // convert to boolean
	            if (textContent === 'true' || textContent === 'false') {
	                value = textContent === 'true';
	            } else {
	                value = textContent;
	            }
	        }

	        result[name] = value;
	    });

	    return result;
	};

	;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 *
	 * @description Parsing information about document
	 * @param xml
	 * @private
	 * @return {Object}
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	exports['default'] = function (xml) {
	    var result = {};
	    var node = xml && xml.querySelector('coreProperties');

	    [].forEach.call(node && node.childNodes || [], function (_ref) {
	        var textContent = _ref.textContent;
	        var localName = _ref.localName;

	        var value = undefined;

	        if (localName === 'created' || localName === 'modified') {
	            value = textContent && new Date(textContent) || null;
	        } else if (!isNaN(textContent)) {
	            value = Number(textContent);
	        } else {
	            value = textContent || '';
	        }

	        result[localName] = value;
	    });

	    return result;
	};

	;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _JsFile = __webpack_require__(1);

	var _JsFile2 = _interopRequireDefault(_JsFile);

	var formatPropertyName = _JsFile2['default'].Engine.formatPropertyName;

	/**
	 *
	 * @description Parsing information about fonts
	 * @param xml
	 * @return {Object}
	 * @private
	 */

	exports['default'] = function (xml) {
	    var result = {};
	    var forEach = [].forEach;

	    forEach.call(xml && xml.querySelectorAll('font') || [], function (node) {
	        var name = node.attributes['w:name'] && node.attributes['w:name'].value;
	        if (name) {
	            result[name] = {};
	            forEach.call(node && node.childNodes || [], function (_ref) {
	                var localName = _ref.localName;
	                var attributes = _ref.attributes;

	                if (localName === 'sig') {
	                    result[name][localName] = {};
	                    forEach.call(attributes || [], function (_ref2) {
	                        var name = _ref2.name;
	                        var value = _ref2.value;

	                        this[formatPropertyName(name)] = value;
	                    }, result[name][localName]);
	                } else {
	                    result[name][localName] = attributes['w:val'] && attributes['w:val'].value;
	                }
	            });
	        }
	    });

	    return result;
	};

	;
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _JsFile = __webpack_require__(1);

	var _JsFile2 = _interopRequireDefault(_JsFile);

	var attributeToBoolean = _JsFile2['default'].Engine.attributeToBoolean;

	/**
	 * @description Parsing document web settings
	 * @param xml
	 * @return {Object}
	 * @private
	 */

	exports['default'] = function (xml) {
	    var result = {};
	    var node = xml && xml.querySelector('webSettings');

	    [].forEach.call(node && node.childNodes || [], function (node) {
	        result[node.localName] = attributeToBoolean(node.attributes['w:val']);
	    });

	    return result;
	};

	;
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _JsFile = __webpack_require__(1);

	var _JsFile2 = _interopRequireDefault(_JsFile);

	var _parseLanguageNode = __webpack_require__(10);

	var _parseLanguageNode2 = _interopRequireDefault(_parseLanguageNode);

	var formatPropertyName = _JsFile2['default'].Engine.formatPropertyName;

	/**
	 * @description Parse document settings
	 * @param xml
	 * @return {Object}
	 * @private
	 */

	exports['default'] = function (xml) {
	    var result = {
	        zoom: 100,
	        compat: {},
	        rsids: {
	            rsidRoot: '',
	            values: []
	        },
	        mathProperties: {},
	        shapeDefaults: {
	            defaults: {},
	            layout: {}
	        },
	        colorSchemeMapping: {}
	    };
	    var node = xml && xml.querySelector('settings');

	    [].forEach.call(node && node.childNodes || [], function (node) {
	        var attr = undefined;
	        var subNode = undefined;

	        switch (node.localName) {
	            case 'zoom':
	                attr = node.attributes['w:percent'];
	                if (attr && !isNaN(attr.value)) {
	                    result.zoom = Number(attr.value);
	                }

	                break;
	            case 'proofState':
	                attr = node.attributes['w:spelling'];
	                result.checkSpelling = Boolean(attr && attr.value === 'clean');
	                attr = node.attributes['w:grammar'];
	                result.checkGrammar = Boolean(attr && attr.value === 'clean');
	                break;
	            case 'defaultTabStop':
	                attr = node.attributes['w:val'];
	                result.defaultTabStop = attr && !isNaN(attr.value) ? Number(attr.value) : 1;
	                break;
	            case 'characterSpacingControl':
	                attr = node.attributes['w:val'];
	                result.controlCharacterSpacing = Boolean(attr && attr.value !== 'doNotCompress');
	                break;
	            case 'compat':
	                Array.prototype.forEach.call(node.querySelectorAll('compatSetting'), function (_ref) {
	                    var attributes = _ref.attributes;

	                    var nameAttr = attributes['w:name'];
	                    var uriAttr = attributes['w:uri'];
	                    var valueAttr = attributes['w:val'];
	                    if (nameAttr && nameAttr.value) {
	                        result.compat[nameAttr.value] = {
	                            uri: uriAttr && uriAttr.value || '',
	                            value: valueAttr && !isNaN(valueAttr.value) ? Number(valueAttr.value) : 0
	                        };
	                    }
	                });

	                break;
	            case 'shapeDefaults':
	                subNode = node.querySelector('shapedefaults');

	                if (subNode) {
	                    attr = subNode.attributes['v:ext'];
	                    result.shapeDefaults.defaults.ext = attr && attr.value || '';

	                    attr = subNode.attributes.style;
	                    result.shapeDefaults.defaults.style = attr && attr.value || '';

	                    attr = subNode.attributes.spidmax;
	                    result.shapeDefaults.defaults.spidMax = attr && !isNaN(attr.value) ? Number(attr.value) : 0;
	                }

	                subNode = node.querySelector('shapelayout');
	                if (subNode) {
	                    attr = subNode.attributes['v:ext'];
	                    subNode = subNode.querySelector('idmap');
	                    result.shapeDefaults.layout.ext = attr && attr.value || '';
	                    result.shapeDefaults.layout.idMap = {};
	                    if (subNode) {
	                        attr = subNode.attributes['v:ext'];
	                        result.shapeDefaults.layout.idMap.ext = attr && attr.value || '';
	                        attr = subNode.attributes.data;
	                        result.shapeDefaults.layout.idMap.data = attr && !isNaN(attr.value) ? Number(attr.value) : 0;
	                    }
	                }

	                break;
	            case 'themeFontLang':
	                result.themeFontLanguage = (0, _parseLanguageNode2['default'])(node);
	                break;
	            case 'decimalSymbol':
	                attr = node.attributes['w:val'];
	                result.decimalSymbol = attr && attr.value || '';
	                break;
	            case 'listSeparator':
	                attr = node.attributes['w:val'];
	                result.listSeparator = attr && attr.value || '';
	                break;
	            case 'clrSchemeMapping':
	                Array.prototype.forEach.call(node.attributes || [], function (attr) {
	                    if (attr.value) {
	                        result.colorSchemeMapping[formatPropertyName(attr.name)] = attr.value;
	                    }
	                });

	                break;
	            case 'rsids':
	                subNode = node.querySelector('rsidRoot');
	                attr = subNode && subNode.attributes['w:val'];
	                result.rsids.rsidRoot = attr && attr.value || '';

	                Array.prototype.forEach.call(node.querySelectorAll('rsid'), function (node) {
	                    var attr = node.attributes['w:val'];

	                    if (attr && attr.value) {
	                        result.rsids.values.push(attr.value);
	                    }
	                });

	                break;
	            case 'mathPr':
	                result.mathProperties.intLimit = '';

	                [].forEach.call(node && node.childNodes || [], function (_ref2) {
	                    var localName = _ref2.localName;
	                    var _ref2$attributes = _ref2.attributes;
	                    var attributes = _ref2$attributes === undefined ? {} : _ref2$attributes;

	                    var attr = attributes['m:val'];
	                    var attrValue = attr && attr.value;
	                    switch (localName) {
	                        case 'mathFont':
	                            result.mathProperties.mathFont = attrValue || '';
	                            break;
	                        case 'brkBin':
	                            /**
	                             * @description Values : after, before, repeat
	                             * @type {String}
	                             */
	                            result.mathProperties.breakOnBinary = attrValue || '';
	                            break;
	                        case 'brkBinSub':
	                            /**
	                             * @description Values : --, +-, -+
	                             * @type {String}
	                             */
	                            result.mathProperties.breakOnBinarySubtraction = attrValue || '';
	                            break;
	                        case 'smallFrac':
	                            result.mathProperties.onSmallFraction = Boolean(attr && attrValue !== '0');
	                            break;
	                        case 'dispDef':
	                            result.mathProperties.displayDefault = Boolean(attr && attrValue !== '0');
	                            break;
	                        case 'lMargin':
	                            result.mathProperties.leftMargin = attr && !isNaN(attrValue) ? Number(attrValue) : 0;
	                            break;
	                        case 'rMargin':
	                            result.mathProperties.rightMargin = attr && !isNaN(attrValue) ? Number(attrValue) : 0;
	                            break;
	                        case 'defJc':
	                            result.mathProperties.align = attrValue || 'left';

	                            if (result.mathProperties.align === 'centerGroup') {
	                                result.mathProperties.align = 'center';
	                            }

	                            break;
	                        case 'preSp':
	                            result.mathProperties.preSpacing = attr && !isNaN(attrValue) ? Number(attrValue) : 0;
	                            break;
	                        case 'postSp':
	                            result.mathProperties.postSpacing = attr && !isNaN(attrValue) ? Number(attrValue) : 0;
	                            break;
	                        case 'interSp':
	                            result.mathProperties.interSpacing = attr && !isNaN(attrValue) ? Number(attrValue) : 0;
	                            break;
	                        case 'intraSp':
	                            result.mathProperties.intraSpacing = attr && !isNaN(attrValue) ? Number(attrValue) : 0;
	                            break;
	                        case 'wrapIndent':
	                            result.mathProperties.wrapIndent = attr && !isNaN(attrValue) ? Number(attrValue) : 0;
	                            break;
	                        case 'wrapRight':
	                            result.mathProperties.wrapRight = attr && !isNaN(attrValue) ? Number(attrValue) : 0;
	                            break;
	                        case 'intLim':
	                            if (!attr) {
	                                result.mathProperties.intLimit = '';
	                            } else if (attrValue === 'undOvr') {
	                                result.mathProperties.intLimit = 'UnderOverLocation';
	                            } else if (attrValue === 'subSup') {
	                                result.mathProperties.intLimit = 'SubscriptSuperscriptLocation';
	                            }

	                            break;
	                        case 'naryLim':
	                            if (!attr) {
	                                result.mathProperties.naryLimit = '';
	                            } else if (attrValue === 'undOvr') {
	                                result.mathProperties.naryLimit = 'UnderOverLocation';
	                            } else if (attrValue === 'subSup') {
	                                result.mathProperties.naryLimit = 'SubscriptSuperscriptLocation';
	                            }

	                            break;
	                    }
	                });

	                break;
	        }
	    });

	    return result;
	};

	;
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	 *
	 * @param node
	 * @return {Object}
	 * @private
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	exports['default'] = function (node) {
	    var result = {
	        latin: null,
	        eastAsia: null,
	        complexLanguage: null
	    };

	    if (node) {
	        var attr = node.attributes['w:val'];
	        result.latin = attr && attr.value || result.latin;

	        attr = node.attributes['w:bidi'];
	        result.complexLanguage = attr && attr.value || result.complexLanguage;

	        attr = node.attributes['w:eastAsia'];
	        result.eastAsia = attr && attr.value || result.eastAsia;
	    }

	    return result;
	};

	;
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _JsFile = __webpack_require__(1);

	var _JsFile2 = _interopRequireDefault(_JsFile);

	/**
	 *
	 * @param xml
	 * @returns {*}
	 * @private
	 */

	exports['default'] = function (xml) {
	    var node = xml.querySelector('themeElements');
	    var result = {
	        style: {}
	    };

	    [].some.call(node && node.childNodes || [], function (node) {
	        if (node.localName === 'fontScheme') {
	            var font = node.querySelector('minorFont > latin');
	            if (font && font.attributes.typeface && font.attributes.typeface.value) {
	                result.style.fontFamily = font.attributes.typeface.value;
	            }

	            font = node.querySelector('majorFont > latin');
	            if (font && font.attributes.typeface && font.attributes.typeface.value) {
	                result.style.fontFamily = font.attributes.typeface.value;
	            }

	            return true;
	        }
	    });

	    return result;
	};

	;
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _JsFile = __webpack_require__(1);

	var _JsFile2 = _interopRequireDefault(_JsFile);

	var _parseTextProperties = __webpack_require__(13);

	var _parseTextProperties2 = _interopRequireDefault(_parseTextProperties);

	var _parseParagraphProperties = __webpack_require__(16);

	var _parseParagraphProperties2 = _interopRequireDefault(_parseParagraphProperties);

	var _parseTableProperties = __webpack_require__(21);

	var _parseTableProperties2 = _interopRequireDefault(_parseTableProperties);

	var _JsFile$Engine = _JsFile2['default'].Engine;
	var formatPropertyName = _JsFile$Engine.formatPropertyName;
	var attributeToBoolean = _JsFile$Engine.attributeToBoolean;

	var parsers = {
	    rPr: {
	        name: 'textProperties',
	        selector: 'p', //set for all content in paragraph
	        exec: _parseTextProperties2['default']
	    },
	    pPr: {
	        name: 'paragraphProperties',
	        selector: 'p',
	        exec: _parseParagraphProperties2['default']
	    },
	    tblPr: {
	        name: 'tableProperties',
	        selector: 'table',
	        exec: _parseTableProperties2['default']
	    }
	};

	/**
	 * @description Parsing document styles
	 * @param xml
	 * @return {Object}
	 * @private
	 */

	exports['default'] = function (xml) {
	    var result = {
	        defaults: {
	            paragraphProperties: {},
	            textProperties: {}
	        },
	        latentStyles: {
	            exceptions: {}
	        },
	        computed: [],
	        named: {}
	    };
	    var node = xml.querySelector('styles');
	    var forEach = [].forEach;

	    forEach.call(node && node.childNodes || [], function (node) {
	        var localName = node.localName;

	        if (localName === 'docDefaults') {
	            forEach.call(node.querySelectorAll('rPr, pPr'), function (node) {
	                var _ref = parsers[node.localName] || {};

	                var exec = _ref.exec;
	                var name = _ref.name;
	                var selector = _ref.selector;

	                if (exec) {
	                    result.defaults[name] = exec(node);
	                    result.computed.push({
	                        selector: selector,
	                        properties: result.defaults[name].style
	                    });
	                }
	            });
	        } else if (localName === 'latentStyles') {
	            forEach.call(node.attributes || [], function (_ref2) {
	                var name = _ref2.name;
	                var _ref2$value = _ref2.value;
	                var value = _ref2$value === undefined ? '' : _ref2$value;

	                result.latentStyles[formatPropertyName(name)] = isNaN(value) ? value : Number(value);
	            });

	            forEach.call(node.querySelectorAll('lsdException'), function (node) {
	                var data = {};
	                var exName = undefined;

	                forEach.call(node.attributes || [], function (_ref3) {
	                    var name = _ref3.name;
	                    var _ref3$value = _ref3.value;
	                    var value = _ref3$value === undefined ? '' : _ref3$value;

	                    var formattedName = formatPropertyName(name);
	                    if (formattedName === 'name') {
	                        exName = formattedName;
	                        result.latentStyles.exceptions[exName] = data;
	                    }

	                    if (exName) {
	                        result.latentStyles.exceptions[exName][formattedName] = isNaN(value) ? value : Number(value);
	                    } else {
	                        data[formattedName] = isNaN(value) ? value : Number(value);
	                    }
	                });
	            });
	        } else if (localName === 'style') {
	            (function () {
	                var attr = node.attributes['w:styleId'];
	                var styleId = attr && attr.value;

	                if (styleId) {
	                    result.named[styleId] = {
	                        isDefault: attributeToBoolean(node.attributes['w:default']),
	                        type: node.attributes['w:type'] && node.attributes['w:type'].value
	                    };

	                    forEach.call(node.childNodes || [], function (node) {
	                        var localName = node.localName;
	                        var attributes = node.attributes;

	                        var _ref4 = parsers[localName] || {};

	                        var exec = _ref4.exec;
	                        var name = _ref4.name;
	                        var selector = _ref4.selector;

	                        if (exec) {
	                            this[name] = exec(node);
	                            result.computed.push({
	                                selector: '.' + styleId,
	                                properties: this[name].style
	                            });
	                        } else if (['name', 'rsid', 'basedOn', 'next', 'uiPriority', 'link'].indexOf(localName) >= 0) {
	                            attr = attributes['w:val'];
	                            if (attr && attr.value) {
	                                this[localName] = attr.value;
	                            }
	                        } else if (localName === 'unhideWhenUsed') {
	                            this.unHideWhenUsed = attributeToBoolean(attributes['w:val']);
	                        } else if (localName === 'qFormat') {
	                            this.isPrimary = attributeToBoolean(attributes['w:val']);
	                        }
	                    }, result.named[styleId]);
	                }
	            })();
	        }
	    });

	    return result;
	};

	;
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _JsFile = __webpack_require__(1);

	var _JsFile2 = _interopRequireDefault(_JsFile);

	var _parseStyleEffectProperty = __webpack_require__(14);

	var _parseStyleEffectProperty2 = _interopRequireDefault(_parseStyleEffectProperty);

	var _parseEmphasis = __webpack_require__(15);

	var _parseEmphasis2 = _interopRequireDefault(_parseEmphasis);

	var _parseLanguageNode = __webpack_require__(10);

	var _parseLanguageNode2 = _interopRequireDefault(_parseLanguageNode);

	var _JsFile$Engine = _JsFile2['default'].Engine;
	var merge = _JsFile$Engine.merge;
	var attributeToBoolean = _JsFile$Engine.attributeToBoolean;
	var normalizeColorValue = _JsFile$Engine.normalizeColorValue;

	exports['default'] = function (node, documentData) {
	    var result = {
	        style: {},
	        properties: {}
	    };

	    [].forEach.call(node && node.childNodes || [], function (node) {
	        var attr = undefined;
	        var attrValue = undefined;
	        var attributes = node.attributes;
	        var localName = node.localName;

	        switch (localName) {
	            case 'b':
	                result.style.fontWeight = attributeToBoolean(attributes['w:val']) ? 'normal' : 'bold';
	                break;
	            case 'bCs':
	                result.style.fontWeight = attributeToBoolean(attributes['w:val']) ? result.style.fontWeight : 'bold';
	                break;
	            case 'i':
	                attr = attributes['w:val'];
	                result.style.fontStyle = attr && !attributeToBoolean(attr) ? 'normal' : 'italic';
	                break;
	            case 'caps':
	            case 'smallCaps':
	                attr = attributes['w:val'];
	                if (!attr || attributeToBoolean(attr)) {
	                    result.style.textTransform = 'uppercase';
	                }

	                break;
	            case 'color':
	                attrValue = attributes['w:val'] && attributes['w:val'].value;
	                if (attrValue) {
	                    result.style.color = normalizeColorValue(attrValue);
	                }

	                //TODO: parse attributes  themeColor, themeShade, themeTint
	                break;
	            case 'dstrike':
	            case 'strike':
	                attr = attributes['w:val'];
	                result.style.textDecoration = attr && !attributeToBoolean(attr) ? 'none' : 'line-through';
	                break;
	            case 'emboss':
	            case 'imprint':
	                attr = attributes['w:val'];
	                if (!attr || attributeToBoolean(attr)) {
	                    result.style.textShadow = '-1pt -1pt 1pt #000000';
	                }

	                break;
	            case 'outline':
	                attr = attributes['w:val'];
	                if (!attr || attributeToBoolean(attr)) {
	                    result.style.textStroke = '1pt #000000';
	                }

	                break;
	            case 'rStyle':
	                attrValue = attributes['w:val'] && attributes['w:val'].value;
	                if (attrValue) {
	                    if (!result.properties.className) {
	                        result.properties.className = '';
	                    } else {
	                        attrValue = ' ' + attrValue;
	                    }

	                    result.properties.className += attrValue;
	                }

	                break;
	            case 'shadow':
	                attr = attributes['w:val'];
	                result.style.textShadow = attr && !attributeToBoolean(attr) ? 'none' : '-1pt 0 1pt #000000';
	                break;
	            case 'sz':
	            case 'szCs':
	                attrValue = attributes['w:val'] && attributes['w:val'].value;
	                if (!isNaN(attrValue) && (localName === 'sz' || !result.style.fontSize)) {
	                    result.style.fontSize = {
	                        unit: 'pt',
	                        value: attrValue / 2
	                    };
	                }

	                break;
	            case 'u':
	                attrValue = attributes['w:val'] && attributes['w:val'].value;
	                if (attrValue && attrValue !== 'none') {
	                    result.style.textDecoration = 'underline';
	                }

	                break;
	            case 'specVanish':
	            case 'vanish':
	                attr = attributes['w:val'];
	                result.style.visibility = attr && !attributeToBoolean(attr) ? 'visible' : 'hidden';
	                break;
	            case 'vertAlign':
	                attr = attributes['w:val'] && attributes['w:val'].value;
	                if (attr === 'subscript') {
	                    result.properties.tagName = 'SUB';
	                } else if (attr === 'superscript') {
	                    result.properties.tagName = 'SUP';
	                }

	                break;
	            case 'rtl':
	                result.style.direction = attributeToBoolean(attributes['w:val']) ? 'rtl' : 'ltr';
	                break;
	            case 'iCs':
	                attr = attributes['w:val'];
	                if (attr && !attributeToBoolean(attr)) {
	                    result.style.fontStyle = 'italic';
	                }

	                break;

	            //TODO parse 'w:cs'
	            case 'rFonts':
	                attr = attributes['w:ascii'];
	                if (attr) {
	                    result.style.fontFamily = attr.value || '';
	                } else {
	                    attr = attributes['w:cs'];
	                    if (attr) {
	                        result.style.fontFamily = attr.value || '';
	                    } else {
	                        attr = attributes['w:asciiTheme'];
	                        if (attr) {
	                            if (/major/ig.test(attr.value)) {
	                                result.properties.majorFontFamily = true;
	                            } else if (/minor/ig.test(attr.value)) {
	                                result.properties.minorFontFamily = true;
	                            }
	                        }
	                    }
	                }

	                break;
	            case 'oMath':
	                result.properties.math = attributeToBoolean(attributes['w:val']);
	                break;
	            case 'snapToGrid':
	                result.properties.useDocumentGrid = attributeToBoolean(attributes['w:val']);
	                break;
	            case 'webHidden':
	                result.properties.webHiddenText = attributeToBoolean(attributes['w:val']);
	                break;
	            case 'noProof':
	                result.properties.checkSpellingGrammar = !attributeToBoolean(attributes['w:val']);
	                break;
	            case 'fitText':
	                result.properties.fitText = result.properties.fitText || {};
	                attrValue = attributes['w:id'] && attributes['w:id'].value;
	                result.fitText.id = attrValue || null;
	                attrValue = attributes['w:val'] && attributes['w:val'].value;
	                result.fitText.width = !isNaN(attrValue) ? {
	                    value: attrValue / 20,
	                    unit: 'pt'
	                } : null;
	                break;
	            case 'effect':
	                result.properties.effect = (0, _parseStyleEffectProperty2['default'])(node);
	                break;
	            case 'eastAsianLayout':
	                result.properties.eastAsianSettings = {
	                    id: attributes['w:id'] ? attributes['w:id'].value : null,
	                    combines: Boolean(attributes['w:combine']),
	                    isVertical: Boolean(attributes['w:vert']),
	                    verticalCompress: Boolean(attributes['w:vertCompress']),
	                    combineBrackets: attributes['w:combineBrackets'] && attributes['w:combineBrackets'].value
	                };

	                break;
	            case 'position':
	                attrValue = attributes['w:val'] && attributes['w:val'].value;
	                if (!isNaN(attrValue)) {
	                    result.properties.position = {
	                        value: attrValue / 2,
	                        unit: 'pt'
	                    };
	                }

	                break;
	            case 'kern':
	                attrValue = attributes['w:val'] && attributes['w:val'].value;
	                if (!isNaN(attrValue)) {
	                    result.style.letterSpacing = {
	                        value: attrValue / 20,
	                        unit: 'pt'
	                    };
	                }

	                break;
	            case 'shd':
	                attrValue = attributes['w:fill'] && attributes['w:fill'].value;
	                if (attrValue) {
	                    result.style.backgroundColor = normalizeColorValue(attrValue);
	                }

	                break;
	            case 'em':
	                result.properties.emphasis = (0, _parseEmphasis2['default'])(attributes['w:val']);
	                break;
	            case 'highlight':
	                attrValue = attributes['w:val'] && attributes['w:val'].value;
	                attrValue = attrValue && normalizeColorValue(attrValue);
	                if (attrValue) {
	                    result.style.backgroundColor = attrValue;
	                }

	                break;
	            case 'bdr':
	                var color = attributes['w:color'] && normalizeColorValue(attributes['w:color'].value);
	                var width = attributes['w:sz'] && attributes['w:sz'].value / 8;

	                if (color && !isNaN(width)) {
	                    result.style.borderWidth = {
	                        //can't show the border with small width
	                        value: width > 1 || width <= 0 ? width : Math.ceil(width / 8),
	                        unit: 'pt'
	                    };
	                    result.style.borderColor = color;
	                    result.style.borderStyle = 'solid';
	                }

	                break;
	            case 'lang':
	                var lang = (0, _parseLanguageNode2['default'])(node).latin;
	                if (lang) {
	                    result.properties.lang = lang;
	                }

	                break;
	        }
	    });

	    return result;
	};

	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var effectPatterns = {
	    blinkBackground: 'blinkBackgroundAnimation',
	    lights: 'lightsAnimation',
	    antsBlack: 'blackDashedLineAnimation',
	    antsRed: 'redDashedLineAnimation',
	    shimmer: 'shimmerAnimation',
	    sparkle: 'sparkleAnimation'
	};

	/**
	 * @param node
	 * @return {String}
	 * @private
	 */

	exports['default'] = function () {
	    var node = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var _node$attributes = node.attributes;
	    var attributes = _node$attributes === undefined ? {} : _node$attributes;

	    return effectPatterns[attributes['w:val'] && attributes['w:val'].value] || 'none';
	};

	;
	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var values = {
	    dot: 'dotted',
	    comma: 'comma',
	    circle: 'circle',
	    underDot: 'underDotted'
	};

	/**
	 *
	 * @param attribute
	 * @returns {string}
	 */

	exports['default'] = function (attribute) {
	    return attribute && values[attribute.value] || '';
	};

	;
	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _JsFile = __webpack_require__(1);

	var _JsFile2 = _interopRequireDefault(_JsFile);

	var _prepareLineStyle = __webpack_require__(17);

	var _prepareLineStyle2 = _interopRequireDefault(_prepareLineStyle);

	var _parseTextProperties = __webpack_require__(13);

	var _parseTextProperties2 = _interopRequireDefault(_parseTextProperties);

	var _normalizeLineHeight = __webpack_require__(18);

	var _normalizeLineHeight2 = _interopRequireDefault(_normalizeLineHeight);

	var _parseBorderProperties = __webpack_require__(19);

	var _parseBorderProperties2 = _interopRequireDefault(_parseBorderProperties);

	var _JsFile$Engine = _JsFile2['default'].Engine;
	var merge = _JsFile$Engine.merge;
	var normalizeColorValue = _JsFile$Engine.normalizeColorValue;

	var alignmentValues = ['left', 'right', 'center'];

	exports['default'] = function (node, documentData) {
	    var result = {
	        style: {},
	        properties: {
	            textProperties: {
	                properties: {}
	            }
	        }
	    };
	    var forEach = [].forEach;

	    forEach.call(node && node.childNodes || [], function (node) {
	        var attrValue = undefined;
	        var localName = node.localName;

	        switch (localName) {
	            case 'ind':
	                attrValue = node.attributes['w:left'] && node.attributes['w:left'].value;
	                if (!isNaN(attrValue)) {
	                    result.style.marginLeft = {
	                        unit: 'pt',
	                        value: attrValue / 20
	                    };
	                }

	                attrValue = node.attributes['w:right'] && node.attributes['w:right'].value;
	                if (!isNaN(attrValue)) {
	                    result.style.marginRight = {
	                        unit: 'pt',
	                        value: attrValue / 20
	                    };
	                }

	                //hanging and firstLine are mutually exclusive
	                attrValue = node.attributes['w:hanging'] && node.attributes['w:hanging'].value;
	                if (!isNaN(attrValue)) {
	                    result.style.textIndent = result.style.textIndent || {
	                        unit: 'pt',
	                        value: 0
	                    };

	                    result.style.textIndent.value = -attrValue / 20;
	                } else {
	                    attrValue = node.attributes['w:firstLine'] && node.attributes['w:firstLine'].value;
	                    if (!isNaN(attrValue)) {
	                        result.style.textIndent = result.style.textIndent || {
	                            unit: 'pt',
	                            value: 0
	                        };

	                        result.style.textIndent.value = attrValue / 20;
	                    }
	                }

	                break;
	            case 'jc':
	                attrValue = node.attributes['w:val'] && node.attributes['w:val'].value;
	                if (attrValue === 'both') {
	                    result.style.textAlign = 'justify';
	                } else if (alignmentValues.indexOf(attrValue) >= 0) {
	                    result.style.textAlign = attrValue;
	                }

	                break;
	            case 'keepNext':
	            case 'keepLines':
	                result.properties[localName] = true;
	                break;
	            case 'numPr':
	                var _ref = node.querySelector('numId') || {},
	                    idAttrs = _ref.attributes;

	                var _ref2 = node.querySelector('ilvl') || {},
	                    levelAttrs = _ref2.attributes;

	                var id = idAttrs && idAttrs['w:val'] && idAttrs['w:val'].value;
	                var level = levelAttrs && levelAttrs['w:val'] && levelAttrs['w:val'].value;

	                result.properties.numbering = {
	                    id: !isNaN(id) ? Number(id) : 0,
	                    level: !isNaN(level) ? Number(level) : 0
	                };

	                break;
	            case 'outlineLvl':
	                attrValue = node.attributes['w:val'] && node.attributes['w:val'].value;
	                result.properties.outlineLevel = !isNaN(attrValue) ? Number(attrValue) : 0;
	                break;
	            case 'pBdr':
	                merge(result.style, (0, _parseBorderProperties2['default'])(node));
	                break;
	            case 'pStyle':
	                attrValue = node.attributes['w:val'] && node.attributes['w:val'].value;
	                if (attrValue) {
	                    if (!result.properties.className) {
	                        result.properties.className = '';
	                    } else {
	                        attrValue = ' ' + attrValue;
	                    }

	                    result.properties.className += attrValue;
	                    var headingInfo = /Heading\s*([0-9]+)/i.exec(attrValue);

	                    if (headingInfo) {
	                        result.properties.heading = {
	                            level: isNaN(headingInfo[1]) ? 0 : Number(headingInfo[1])
	                        };
	                    } else if (/List\s*Paragraph/i.test(attrValue)) {
	                        /**
	                         * @description mark it as a list item
	                         * @type {string}
	                         */
	                        result.properties.tagName = 'LI';
	                    }
	                }

	                break;
	            case 'rPr':
	                result.properties.textProperties = merge(result.properties.textProperties, (0, _parseTextProperties2['default'])(node, documentData));
	                break;
	            case 'shd':
	                attrValue = node.attributes['w:fill'] && node.attributes['w:fill'].value;
	                if (attrValue) {
	                    result.style.backgroundColor = normalizeColorValue(attrValue);
	                }

	                break;
	            case 'spacing':
	                attrValue = node.attributes['w:line'] && node.attributes['w:line'].value;
	                if (!isNaN(attrValue)) {
	                    result.style.lineHeight = (0, _normalizeLineHeight2['default'])(attrValue);

	                    /**
	                     * @description Fix for empty container
	                     * @type {String}
	                     */
	                    result.style.minHeight = {
	                        value: attrValue / 20,
	                        unit: 'pt'
	                    };
	                }

	                attrValue = node.attributes['w:before'] && node.attributes['w:before'].value;
	                if (!isNaN(attrValue)) {
	                    result.style.marginTop = {
	                        value: attrValue / 20,
	                        unit: 'pt'
	                    };
	                }

	                attrValue = node.attributes['w:after'] && node.attributes['w:after'].value;
	                if (!isNaN(attrValue)) {
	                    result.style.marginBottom = {
	                        value: attrValue / 20,
	                        unit: 'pt'
	                    };
	                }

	                break;
	            case 'textAlignment':
	                attrValue = node.attributes['w:val'] && node.attributes['w:val'].value;
	                if (attrValue === 'subscript') {
	                    result.properties.textProperties.properties.tagName = 'SUB';
	                } else if (attrValue === 'superscript') {
	                    result.properties.textProperties.properties.tagName = 'SUP';
	                }

	                break;
	        }
	    });

	    return result;
	};

	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	exports['default'] = function (style) {
	    if (!style || style === 'none' || style === 'nil') {
	        style = 'none';
	    } else if (style.indexOf('dash') >= 0) {
	        style = 'dashed';
	    } else if (style.indexOf('dot') >= 0) {
	        style = 'dotted';
	    } else if (style.indexOf('double') >= 0) {
	        style = 'double';
	    } else if (style.indexOf('inset') >= 0) {
	        style = 'inset';
	    } else if (style.indexOf('outset') >= 0) {
	        style = 'outset';
	    } else {
	        style = 'solid';
	    }

	    return style;
	};

	module.exports = exports['default'];

/***/ },
/* 18 */
/***/ function(module, exports) {

	/**
	 * @description 240 => 1, 360 => 1.5
	 * @return {Number}
	 * @private
	 */
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports["default"] = function (value) {
	  var result = Math.round(value / 240 * 100) / 100;

	  return isNaN(result) || result < 1 ? 1 : result;
	};

	;
	module.exports = exports["default"];

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _JsFile = __webpack_require__(1);

	var _JsFile2 = _interopRequireDefault(_JsFile);

	var _prepareLineStyle = __webpack_require__(17);

	var _prepareLineStyle2 = _interopRequireDefault(_prepareLineStyle);

	var _normalizeSideValue = __webpack_require__(20);

	var _normalizeSideValue2 = _interopRequireDefault(_normalizeSideValue);

	var normalizeColorValue = _JsFile2['default'].Engine.normalizeColorValue;

	exports['default'] = function (node) {
	    var result = {};

	    [].forEach.call(node && node.childNodes || [], function (_ref) {
	        var localName = _ref.localName;
	        var attributes = _ref.attributes;

	        localName = localName || '';
	        var side = (0, _normalizeSideValue2['default'])(localName);
	        var color = attributes['w:color'] && attributes['w:color'].value;
	        var style = (0, _prepareLineStyle2['default'])(attributes['w:val'] && attributes['w:val'].value);
	        var width = attributes['w:sz'] && attributes['w:sz'].value || 0;

	        if (side && color) {
	            var borderName = 'border' + side;
	            result[borderName + 'Color'] = normalizeColorValue(color);
	            result[borderName + 'Style'] = style;
	            result[borderName + 'Width'] = {
	                value: width / 8,
	                unit: 'pt'
	            };
	        }
	    }, this);

	    return result;
	};

	module.exports = exports['default'];

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _JsFile = __webpack_require__(1);

	var _JsFile2 = _interopRequireDefault(_JsFile);

	var formatPropertyName = _JsFile2['default'].Engine.formatPropertyName;

	var sides = {
	    top: 'top',
	    bottom: 'bottom',
	    left: 'left',
	    start: 'start',
	    right: 'right',
	    end: 'end'
	};

	exports['default'] = function (value) {
	    var capitalizedValue = formatPropertyName(value, { capitalize: true });
	    return sides[capitalizedValue] || capitalizedValue;
	};

	module.exports = exports['default'];

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _JsFile = __webpack_require__(1);

	var _JsFile2 = _interopRequireDefault(_JsFile);

	var _parseBorderProperties = __webpack_require__(19);

	var _parseBorderProperties2 = _interopRequireDefault(_parseBorderProperties);

	var _normalizeSideValue = __webpack_require__(20);

	var _normalizeSideValue2 = _interopRequireDefault(_normalizeSideValue);

	var _JsFile$Engine = _JsFile2['default'].Engine;
	var merge = _JsFile$Engine.merge;
	var normalizeColorValue = _JsFile$Engine.normalizeColorValue;
	var formatPropertyName = _JsFile$Engine.formatPropertyName;

	exports['default'] = function (node) {
	    var result = {
	        style: {}
	    };
	    var forEach = [].forEach;

	    forEach.call(node && node.childNodes || [], function (node) {
	        var attrValue = undefined;
	        var type = undefined;
	        var attributes = node.attributes;
	        var localName = node.localName;

	        switch (localName) {
	            case 'jc':
	                attrValue = (0, _normalizeSideValue2['default'])(attributes['w:val'] && attributes['w:val'].value);
	                if (attrValue === 'left' || attrValue === 'right') {
	                    result.style.float = attrValue;
	                }

	                break;
	            case 'shd':
	                attrValue = attributes['w:fill'] && attributes['w:fill'].value;
	                if (attrValue) {
	                    result.style.backgroundColor = normalizeColorValue(node);
	                }

	                break;
	            case 'tblBorders':
	                if (!result.style.borderSpacing) {
	                    result.style.borderCollapse = 'collapse';
	                }

	                merge(result.style, (0, _parseBorderProperties2['default'])(node));
	                var horizontalBorder = node.querySelector('insideH');
	                var verticalBorder = node.querySelector('insideV');
	                if (horizontalBorder || verticalBorder) {
	                    result.colProperties = result.colProperties || {
	                        style: {}
	                    };

	                    if (horizontalBorder) {
	                        merge(result.colProperties.style, (0, _parseBorderProperties2['default'])(horizontalBorder));
	                    }

	                    if (verticalBorder) {
	                        merge(result.colProperties.style, (0, _parseBorderProperties2['default'])(verticalBorder));
	                    }
	                }

	                break;
	            case 'tblCaption':
	                attrValue = attributes['w:val'] && attributes['w:val'].value;
	                if (attrValue) {
	                    result.caption = attrValue;
	                }

	                break;
	            case 'tblCellMar':
	                result.colProperties = result.colProperties || {
	                    style: {}
	                };

	                forEach.call(node && node.childNodes || [], function (node) {
	                    var side = formatPropertyName((0, _normalizeSideValue2['default'])(node.localName), {
	                        capitalize: true
	                    });
	                    attrValue = Number(attributes['w:w'] && attributes['w:w'].value);
	                    if (attrValue && !isNaN(attrValue) && side) {
	                        type = attributes['w:type'] && attributes['w:type'].value;
	                        result.colProperties.style['padding' + side] = {
	                            unit: 'pt',
	                            value: attrValue / (type === 'nil' ? 1 : 20)
	                        };
	                    }
	                });

	                break;
	            case 'tblCellSpacing':
	                attrValue = Number(attributes['w:w'] && attributes['w:w'].value);
	                if (attrValue && !isNaN(attrValue)) {
	                    type = attributes['w:type'] && attributes['w:type'].value;
	                    delete result.style.borderCollapse;

	                    result.style.borderSpacing = {
	                        unit: 'pt',
	                        value: attrValue / (type === 'nil' ? 1 : 20)
	                    };
	                }

	                break;
	            case 'tblInd':
	                attrValue = Number(attributes['w:w'] && attributes['w:w'].value);
	                if (attrValue && !isNaN(attrValue)) {
	                    type = attributes['w:type'] && attributes['w:type'].value;
	                    result.style.marginLeft = result.style.marginLeft || {
	                        value: 0,
	                        unit: 'pt'
	                    };

	                    result.style.marginLeft.value += attrValue / (type === 'nil' ? 1 : 20);
	                }

	                break;
	            case 'tblLayout':
	                attrValue = attributes['w:type'] && attributes['w:type'].value;
	                if (attrValue === 'fixed') {
	                    result.style.tableLayout = 'fixed';
	                }

	                break;

	            // TODO: handle tblLook, tblOverlap, tblpPr
	            case 'tblStyle':
	                result.styleId = attributes['w:val'] && attributes['w:val'].value;
	                break;
	            case 'tblStyleColBandSize':
	                result.colBindSize = Number(attributes['w:val'] && attributes['w:val'].value);
	                break;
	            case 'tblStyleRowBandSize':
	                result.rowBindSize = Number(attributes['w:val'] && attributes['w:val'].value);
	                break;
	            case 'tblW':
	                attrValue = Number(attributes['w:w'] && attributes['w:w'].value);
	                if (attrValue && !isNaN(attrValue)) {
	                    type = attributes['w:type'] && attributes['w:type'].value;
	                    result.style.width = {
	                        unit: 'pt'
	                    };

	                    if (type === 'pct') {
	                        result.style.width.unit = '%';
	                    } else if (!type || type !== 'nil') {
	                        attrValue /= 20;
	                    }

	                    result.style.width.value = attrValue;
	                }

	                break;
	        }
	    });

	    return result;
	};

	module.exports = exports['default'];

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _JsFile = __webpack_require__(1);

	var _JsFile2 = _interopRequireDefault(_JsFile);

	var _parseSectionProperties = __webpack_require__(23);

	var _parseSectionProperties2 = _interopRequireDefault(_parseSectionProperties);

	var _parseDocumentContentNodes = __webpack_require__(24);

	var _parseDocumentContentNodes2 = _interopRequireDefault(_parseDocumentContentNodes);

	var Document = _JsFile2['default'].Document;
	var _JsFile$Engine = _JsFile2['default'].Engine;
	var normalizeColorValue = _JsFile$Engine.normalizeColorValue;
	var invalidReadFile = _JsFile$Engine.errors.invalidReadFile;

	/**
	 * @description Parsing content of document
	 * @param params
	 * @return {Object}
	 * @private
	 */

	exports['default'] = function (params) {
	    return new Promise((function (resolve, reject) {
	        var xml = params.xml;
	        var _params$documentData = params.documentData;
	        var documentData = _params$documentData === undefined ? {} : _params$documentData;
	        var _params$fileName = params.fileName;
	        var fileName = _params$fileName === undefined ? '' : _params$fileName;

	        var node = xml && xml.querySelector('parsererror');
	        if (node) {
	            return reject(new Error(invalidReadFile));
	        }

	        var result = {
	            meta: {
	                name: fileName,
	                wordsCount: documentData.applicationInfo && documentData.applicationInfo.wordsCount || null,
	                zoom: documentData.settings && documentData.settings.zoom || 100
	            },
	            content: [],
	            styles: documentData.styles.computed
	        };
	        var pagePrototype = {};
	        node = xml && xml.querySelector('background');

	        if (node) {
	            var attrValue = node.attributes['w:color'] && node.attributes['w:color'].value;
	            if (attrValue) {
	                pagePrototype.style = pagePrototype.style || {};
	                pagePrototype.style.backgroundColor = normalizeColorValue(attrValue);
	            }

	            // TODO: parse themeColor, themeShade, themeTint attributes
	        }

	        node = xml && xml.querySelector('body');
	        if (node) {
	            var nodes = [].slice.call(node.childNodes || [], 0);
	            var lastNode = nodes[nodes.length - 1];
	            if (lastNode.localName === 'sectPr') {
	                /**
	                 * @description remove last item - sectionProperties
	                 */
	                nodes.pop();

	                documentData.styles.defaults.sectionProperties = (0, _parseSectionProperties2['default'])(lastNode, documentData);
	            }

	            (0, _parseDocumentContentNodes2['default'])({
	                nodes: nodes,
	                documentData: documentData
	            }).then(function (response) {
	                var page = Document.elementPrototype;
	                page.children = response[0];
	                page.style = documentData.styles.defaults.sectionProperties && documentData.styles.defaults.sectionProperties.style || {};

	                //TODO: add page break
	                // because now it's only 1 page for all content
	                if (page.style.height) {
	                    page.style.minHeight = page.style.height;
	                    delete page.style.height;
	                }

	                result.content.push(page);
	                resolve(new Document(result));
	            }, reject);
	        } else {
	            resolve(new Document(result));
	        }
	    }).bind(this));
	};

	;
	module.exports = exports['default'];

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _JsFile = __webpack_require__(1);

	var _JsFile2 = _interopRequireDefault(_JsFile);

	var _JsFile$Engine = _JsFile2['default'].Engine;
	var attributeToBoolean = _JsFile$Engine.attributeToBoolean;
	var formatPropertyName = _JsFile$Engine.formatPropertyName;

	exports['default'] = function () {
	    var node = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var documentData = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    var attrValue = undefined;
	    var height = 0;
	    var properties = {};
	    var style = {};

	    [].forEach.call(node && node.childNodes || [], function (_ref) {
	        var localName = _ref.localName;
	        var attributes = _ref.attributes;

	        switch (localName) {
	            case 'pgSz':
	                attrValue = attributes['w:w'] && attributes['w:w'].value;
	                if (!isNaN(attrValue)) {
	                    style.width = {
	                        value: attrValue / 20,
	                        unit: 'pt'
	                    };
	                }

	                attrValue = attributes['w:h'] && attributes['w:h'].value;
	                if (!isNaN(attrValue)) {
	                    style.height = {
	                        value: attrValue / 20,
	                        unit: 'pt'
	                    };

	                    height += style.height.value;
	                }

	                break;
	            case 'pgMar':
	                attrValue = attributes['w:top'] && attributes['w:top'].value;
	                if (!isNaN(attrValue)) {
	                    style.paddingTop = {
	                        value: attrValue / 20,
	                        unit: 'pt'
	                    };

	                    height -= style.paddingTop.value;
	                }

	                attrValue = attributes['w:left'] && attributes['w:left'].value;
	                if (!isNaN(attrValue)) {
	                    style.paddingLeft = {
	                        value: attrValue / 20,
	                        unit: 'pt'
	                    };
	                }

	                attrValue = attributes['w:right'] && attributes['w:right'].value;
	                if (!isNaN(attrValue)) {
	                    style.paddingRight = {
	                        value: attrValue / 20,
	                        unit: 'pt'
	                    };
	                }

	                attrValue = attributes['w:bottom'] && attributes['w:bottom'].value;
	                if (!isNaN(attrValue)) {
	                    style.paddingBottom = {
	                        value: attrValue / 20,
	                        unit: 'pt'
	                    };

	                    height -= style.paddingBottom.value;
	                }

	                attrValue = attributes['w:header'] && attributes['w:header'].value;
	                if (properties.pageNumber && !isNaN(attrValue)) {
	                    properties.header = properties.header || {};
	                    properties.header.style.height = {
	                        value: attrValue / 20,
	                        unit: 'pt'
	                    };
	                }

	                attrValue = attributes['w:footer'] && attributes['w:footer'].value;
	                if (!isNaN(attrValue.value)) {
	                    properties.footer = properties.footer || {};
	                    properties.footer.style.height = {
	                        value: attrValue / 20,
	                        unit: 'pt'
	                    };
	                }

	                attrValue = attributes['w:gutter'] && attributes['w:gutter'].value;
	                if (!isNaN(attrValue.value)) {
	                    style.marginTop = {
	                        value: attrValue / 20,
	                        unit: 'pt'
	                    };
	                }

	                break;
	            case 'pgNumType':
	                attrValue = attributes['w:start'] && attributes['w:start'].value;
	                properties.pageNumber = {
	                    value: 0,
	                    start: !isNaN(attrValue) ? Number(attrValue) : 1
	                };
	                break;
	            case 'cols':
	                properties.cols = properties.cols || {};
	                properties.cols.equalWidth = attributeToBoolean(attributes['w:equalWidth']);
	                properties.cols.separated = attributeToBoolean(attributes['w:sep']);

	                attrValue = attributes['w:num'] && attributes['w:num'].value;
	                properties.cols.number = !isNaN(attrValue) ? Number(attrValue) : properties.cols.number;

	                attrValue = attributes['w:space'] && attributes['w:space'].value;
	                properties.cols.space = !isNaN(attrValue) ? {
	                    value: attrValue / 20,
	                    unit: 'pt'
	                } : properties.cols.space;
	                break;
	            case 'docGrid':
	                attrValue = attributes['w:linePitch'] && attributes['w:linePitch'].value;
	                if (!isNaN(attrValue.value)) {
	                    documentData.styles.defaults.linePitch = {
	                        value: attrValue / 20,
	                        unit: 'pt'
	                    };
	                }

	                break;
	        }
	    });

	    Array.prototype.forEach.call(node.attributes || [], function (_ref2) {
	        var name = _ref2.name;
	        var value = _ref2.value;

	        if (value) {
	            properties[formatPropertyName(name)] = isNaN(value) ? value : Number(value);
	        }
	    });

	    return {
	        properties: properties,
	        style: style
	    };
	};

	module.exports = exports['default'];

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _parseParagraph = __webpack_require__(25);

	var _parseParagraph2 = _interopRequireDefault(_parseParagraph);

	var _parseTable = __webpack_require__(33);

	var _parseTable2 = _interopRequireDefault(_parseTable);

	var _JsFile = __webpack_require__(1);

	function parse(params) {
	    var listElement = undefined;
	    var queue = [[]];
	    var _params$nodes = params.nodes;
	    var nodes = _params$nodes === undefined ? [] : _params$nodes;
	    var _params$documentData = params.documentData;
	    var documentData = _params$documentData === undefined ? {} : _params$documentData;

	    var push2Result = function push2Result(response) {
	        queue[0].push(response[0] || response);
	    };

	    nodes.forEach(function (node) {
	        var localName = node.localName;

	        if (localName === 'tbl') {
	            queue.push((0, _parseTable2['default'])({
	                node: node,
	                documentData: documentData,
	                parseDocumentContentNodes: parse
	            }).then(push2Result));
	        } else if (localName === 'p') {
	            var el = (0, _parseParagraph2['default'])({ node: node, documentData: documentData });
	            var isListItem = el.properties.tagName === 'LI';

	            // if it's a list item
	            if (isListItem) {
	                if (!listElement) {
	                    listElement = _JsFile.Document.elementPrototype;
	                    listElement.properties.tagName = 'UL';
	                    listElement.style.padding = {
	                        value: 0,
	                        unit: 'pt'
	                    };
	                    listElement.style.margin = {
	                        value: 0,
	                        unit: 'pt'
	                    };
	                }

	                listElement.children.push(el);
	            } else {
	                if (listElement) {
	                    push2Result(listElement);
	                    listElement = null;
	                }

	                push2Result(el);
	            }
	        }
	    });

	    return Promise.all(queue);
	}

	exports['default'] = parse;
	module.exports = exports['default'];

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _JsFile = __webpack_require__(1);

	var _JsFile2 = _interopRequireDefault(_JsFile);

	var _parseParagraphProperties = __webpack_require__(16);

	var _parseParagraphProperties2 = _interopRequireDefault(_parseParagraphProperties);

	var _getRelationship = __webpack_require__(26);

	var _getRelationship2 = _interopRequireDefault(_getRelationship);

	var _parseText = __webpack_require__(27);

	var _parseText2 = _interopRequireDefault(_parseText);

	var Document = _JsFile2['default'].Document;
	var _JsFile$Engine = _JsFile2['default'].Engine;
	var merge = _JsFile$Engine.merge;
	var clone = _JsFile$Engine.clone;

	/**
	 *
	 * @param params
	 * @returns {*}
	 */

	exports['default'] = function (params) {
	    var node = params.node;
	    var documentData = params.documentData;

	    var result = Document.elementPrototype;
	    var forEach = [].forEach;
	    result.properties.tagName = 'P';

	    if (!node || !documentData) {
	        return result;
	    }

	    if (documentData.styles.defaults.paragraphProperties) {
	        merge(result.properties, documentData.styles.defaults.paragraphProperties.properties);
	    }

	    forEach.call(node && node.childNodes || [], function (node) {
	        var attrValue = undefined;
	        var el = undefined;
	        var localName = node.localName;

	        switch (localName) {
	            case 'bookmarkStart':
	                attrValue = node.attributes['w:name'] && node.attributes['w:name'].value;
	                if (attrValue) {
	                    el = Document.elementPrototype;
	                    el.properties.tagName = 'A';
	                    el.properties.name = attrValue;
	                    result.children.push(el);
	                }

	                break;
	            case 'pPr':
	                var props = (0, _parseParagraphProperties2['default'])(node, documentData);
	                if (result.properties.tagName === 'LI') {
	                    /**
	                     * @description Clear paragraph styles
	                     * @type {*}
	                     */
	                    result.style = {};
	                }

	                merge(result, props);
	                break;
	            case 'hyperlink':
	                var href = '#';
	                el = Document.elementPrototype;
	                el.properties.tagName = 'A';
	                attrValue = node.attributes['r:id'] && node.attributes['r:id'].value;
	                var relationship = attrValue && (0, _getRelationship2['default'])(attrValue, documentData) || null;

	                forEach.call(node && node.childNodes || [], function (node) {
	                    el.children.push((0, _parseText2['default'])({
	                        node: node,
	                        documentData: documentData
	                    }));
	                });

	                if (relationship) {
	                    href = relationship.target;
	                    el.properties.target = '_blank';
	                } else {
	                    href += node.attributes['w:anchor'] && node.attributes['w:anchor'].value || '';
	                }

	                el.properties.href = href;
	                result.children.push(el);
	                break;
	            case 'r':
	                result.children.push((0, _parseText2['default'])({
	                    node: node,
	                    documentData: documentData
	                }));

	                break;

	            // ignore fldSimple node
	        }
	    });

	    return result;
	};

	module.exports = exports['default'];

/***/ },
/* 26 */
/***/ function(module, exports) {

	/**
	 *
	 * @param relationId
	 * @param documentData
	 * @returns {*}
	 */
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports["default"] = function (relationId) {
	  var documentData = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  var relationships = documentData.relationships || {};

	  return relationships.document[relationId] || relationships.main[relationId];
	};

	;
	module.exports = exports["default"];

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _JsFile = __webpack_require__(1);

	var _JsFile2 = _interopRequireDefault(_JsFile);

	var _parseTextProperties = __webpack_require__(13);

	var _parseTextProperties2 = _interopRequireDefault(_parseTextProperties);

	var _parseDrawing = __webpack_require__(28);

	var _parseDrawing2 = _interopRequireDefault(_parseDrawing);

	var _parsePicture = __webpack_require__(31);

	var _parsePicture2 = _interopRequireDefault(_parsePicture);

	var Document = _JsFile2['default'].Document;
	var _JsFile$Engine = _JsFile2['default'].Engine;
	var merge = _JsFile$Engine.merge;
	var clone = _JsFile$Engine.clone;
	var formatPropertyName = _JsFile$Engine.formatPropertyName;
	var nbHyphen = _JsFile$Engine.nbHyphen;
	var enDash = _JsFile$Engine.enDash;
	var space = _JsFile$Engine.space;
	var tabAsSpaces = _JsFile$Engine.tabAsSpaces;

	exports['default'] = function () {
	    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var node = params.node;
	    var documentData = params.documentData;

	    var result = Document.elementPrototype;
	    var forEach = [].forEach;
	    result.properties.tagName = 'SPAN';

	    if (!node || !documentData) {
	        return result;
	    }

	    var textProperties = {
	        style: {},
	        properties: documentData.styles.defaults.textProperties && clone(documentData.styles.defaults.textProperties.properties) || {}
	    };

	    forEach.call(node && node.childNodes || [], function (node) {
	        var el = undefined;
	        var _node$textContent = node.textContent;
	        var textContent = _node$textContent === undefined ? '' : _node$textContent;
	        var attributes = node.attributes;

	        switch (node.localName) {
	            case 'cr':
	                el = Document.elementPrototype;
	                el.properties.tagName = 'BR';
	                result.children.push(el);
	                break;
	            case 'br':
	                var type = attributes['w:type'] && attributes['w:type'].value;
	                var clear = attributes['w:clear'] && attributes['w:clear'].value;

	                if (!type || type === 'textWrapping') {
	                    el = Document.elementPrototype;

	                    if (!clear || clear === 'none' || clear === 'all') {
	                        el.properties.tagName = 'BR';
	                    }

	                    result.children.push(el);
	                }

	                // TODO: parse types 'column' & 'page', parse clear 'left' & 'right'
	                break;
	            case 'drawing':
	                merge(result, (0, _parseDrawing2['default'])(node, documentData));
	                break;
	            case 'noBreakHyphen':
	                result.properties.textContent = result.properties.textContent || '';
	                result.properties.textContent += nbHyphen;
	                break;
	            case 'softHyphen':
	                result.properties.textContent = result.properties.textContent || '';
	                result.properties.textContent += enDash;
	                break;
	            case 'rPr':
	                merge(textProperties, (0, _parseTextProperties2['default'])(node, documentData));
	                break;

	            // TODO: parse w:sym. It needs more samples of .docx

	            case 't':
	                result.properties.textContent = result.properties.textContent || '';
	                result.properties.textContent += textContent.replace(/\s/g, space);
	                break;
	            case 'tab':
	                result.properties.textContent = result.properties.textContent || '';
	                result.properties.textContent += tabAsSpaces;
	                break;
	            case 'pict':
	                merge(result, (0, _parsePicture2['default'])(node, documentData));
	                break;
	        }
	    });

	    merge(result, textProperties);
	    return result;
	};

	module.exports = exports['default'];

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _JsFile = __webpack_require__(1);

	var _JsFile2 = _interopRequireDefault(_JsFile);

	var _getMediaFromRelationship = __webpack_require__(29);

	var _getMediaFromRelationship2 = _interopRequireDefault(_getMediaFromRelationship);

	var _convertEmu = __webpack_require__(30);

	var _convertEmu2 = _interopRequireDefault(_convertEmu);

	var Document = _JsFile2['default'].Document;
	var _JsFile$Engine = _JsFile2['default'].Engine;
	var formatPropertyName = _JsFile$Engine.formatPropertyName;
	var attributeToBoolean = _JsFile$Engine.attributeToBoolean;

	exports['default'] = function (node, documentData) {
	    var result = Document.elementPrototype;
	    var attrValue = undefined;
	    var childNode = node.querySelector('prstGeom');
	    var extents = {};
	    var inline = {
	        extent: {},
	        effectExtent: {
	            left: 0,
	            top: 0,
	            right: 0,
	            bottom: 0
	        }
	    };
	    var shapeType = childNode && childNode.attributes.prst && childNode.attributes.prst.value || '';
	    var forEach = [].forEach;

	    result.properties.tagName = 'IMG';
	    childNode = node.querySelector('blip');
	    attrValue = childNode && childNode.attributes['r:embed'] && childNode.attributes['r:embed'].value;
	    if (attrValue) {
	        var media = (0, _getMediaFromRelationship2['default'])(attrValue, documentData);
	        if (media) {
	            result.properties.src = media.data;
	        }
	    }

	    childNode = node.querySelector('off');
	    attrValue = childNode && childNode.attributes.y && childNode.attributes.y.value;
	    if (!isNaN(attrValue)) {
	        result.style.marginTop = {
	            value: Number(attrValue),
	            unit: 'pt'
	        };
	    }

	    attrValue = childNode && childNode.attributes.x && childNode.attributes.x.value;
	    if (!isNaN(attrValue)) {
	        result.style.marginLeft = {
	            value: Number(attrValue),
	            unit: 'pt'
	        };
	    }

	    childNode = node.querySelector('positionH');
	    if (childNode) {
	        var offset = childNode.querySelector('posOffset');
	        if (offset && offset.textContent) {
	            result.style.position = 'relative';
	            result.style.left = (0, _convertEmu2['default'])(offset.textContent);
	        }
	    }

	    childNode = node.querySelector('positionV');
	    if (childNode) {
	        var offset = childNode.querySelector('posOffset');
	        if (offset && offset.textContent) {
	            result.style.position = 'relative';
	            result.style.top = (0, _convertEmu2['default'])(offset.textContent);
	        }
	    }

	    childNode = node.querySelector('ext');
	    attrValue = childNode && childNode.attributes.y && childNode.attributes.y.value;
	    if (!isNaN(attrValue)) {
	        extents.top = {
	            value: Number(attrValue),
	            unit: 'pt'
	        };
	    }

	    attrValue = childNode && childNode.attributes.x && childNode.attributes.x.value;
	    if (!isNaN(attrValue)) {
	        extents.left = {
	            value: Number(attrValue),
	            unit: 'pt'
	        };
	    }

	    childNode = node.querySelector('inline');
	    if (childNode) {
	        forEach.call(childNode.attributes || [], function (attr) {
	            var value = attr.value;

	            if (value) {
	                result.properties.inline = result.properties.inline || {};
	                result.properties.inline[formatPropertyName(attr.name)] = isNaN(value) ? value : Number(value);
	            }
	        });

	        childNode = childNode.querySelector('blipFill blip');
	        if (childNode) {
	            attrValue = childNode.attributes['r:embed'] && childNode.attributes['r:embed'].value;
	            var rel = attrValue && documentData.relationships && documentData.relationships.document[attrValue];
	            if (rel) {
	                for (var k in documentData.media) {
	                    if (documentData.media.hasOwnProperty(k) && k.indexOf(rel.target) >= 0) {
	                        result.properties.src = documentData.media[k].data;
	                        break;
	                    }
	                }
	            }
	        }

	        childNode = node.querySelector('docPr');
	        attrValue = childNode && childNode.attributes.id && childNode.attributes.id.value;
	        if (attrValue) {
	            result.properties.id = attrValue;
	        }

	        attrValue = childNode && childNode.attributes.name && childNode.attributes.name.value;
	        if (attrValue) {
	            result.properties.name = attrValue;
	        }

	        if (attributeToBoolean(childNode.attributes.hidden)) {
	            result.style.visibility = 'hidden';
	        }

	        attrValue = childNode && childNode.attributes.descr && childNode.attributes.descr.value;
	        if (attrValue) {
	            result.properties.alt = attrValue;
	        }

	        // TODO: parse childNode = node.querySelector('extent');
	        childNode = node.querySelector('effectExtent');
	        forEach.call(childNode && childNode.attributes || [], function (attr) {
	            var value = attr.value;
	            if (value) {
	                var attrName = formatPropertyName(attr.name);
	                switch (attrName) {
	                    case 'l':
	                        if (!isNaN(value)) {
	                            result.style.left = {
	                                value: Number(value),
	                                unit: 'emu'
	                            };
	                        }

	                        break;
	                    case 'r':
	                        if (!isNaN(value)) {
	                            result.style.right = {
	                                value: Number(value),
	                                unit: 'emu'
	                            };
	                        }

	                        break;
	                    case 'b':
	                        if (!isNaN(value)) {
	                            result.style.bottom = {
	                                value: Number(value),
	                                unit: 'emu'
	                            };
	                        }

	                        break;
	                    case 'top':
	                        if (!isNaN(value)) {
	                            result.style.top = {
	                                value: Number(value),
	                                unit: 'emu'
	                            };
	                        }

	                        break;
	                    default:
	                        inline.effectExtent[attrName] = value;
	                }
	            }
	        });
	    }

	    // TODO: parse inline, extents objects and shapeType property
	    return result;
	};

	module.exports = exports['default'];

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _getRelationship = __webpack_require__(26);

	var _getRelationship2 = _interopRequireDefault(_getRelationship);

	/**
	 *
	 * @param relationId
	 * @param documentData
	 * @returns {*}
	 */

	exports['default'] = function (relationId) {
	  var documentData = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  var relationship = (0, _getRelationship2['default'])(relationId, documentData);

	  return relationship && documentData.media && documentData.media['word/' + relationship.target] || null;
	};

	;
	module.exports = exports['default'];

/***/ },
/* 30 */
/***/ function(module, exports) {

	/**
	 * @description 635 - OXML coef., 20 - 20th of a Point
	 * @param val
	 * @returns {{value: number, unit: string}}
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	exports['default'] = function () {
	    var val = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

	    return {
	        value: val / (635 * 20),
	        unit: 'pt'
	    };
	};

	;
	module.exports = exports['default'];

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _JsFile = __webpack_require__(1);

	var _JsFile2 = _interopRequireDefault(_JsFile);

	var _getMediaFromRelationship = __webpack_require__(29);

	var _getMediaFromRelationship2 = _interopRequireDefault(_getMediaFromRelationship);

	var _parseParagraph = __webpack_require__(25);

	var _parseParagraph2 = _interopRequireDefault(_parseParagraph);

	var _parseStyleAttribute = __webpack_require__(32);

	var _parseStyleAttribute2 = _interopRequireDefault(_parseStyleAttribute);

	var Document = _JsFile2['default'].Document;
	var merge = _JsFile2['default'].Engine.merge;

	var denominator = 20;

	exports['default'] = function (node, documentData) {

	    // TODO: parse all information about picture. It needs more .docx samples
	    var result = Document.elementPrototype;
	    if (!node) {
	        return result;
	    }

	    var forEach = [].forEach;
	    var group = node.querySelector('group');
	    var attrValue = undefined;
	    if (group) {
	        attrValue = group.attributes.style && group.attributes.style.value;

	        if (attrValue) {
	            merge(result.style, (0, _parseStyleAttribute2['default'])({
	                src: attrValue
	            }));
	        }

	        forEach.call(group.childNodes || [], function (node) {
	            var el = Document.elementPrototype;
	            var localName = node.localName;
	            var attrValue = undefined;

	            if (localName === 'shape') {
	                attrValue = node.attributes.style && node.attributes.style.value;
	                if (attrValue) {
	                    merge(el.style, (0, _parseStyleAttribute2['default'])({
	                        src: attrValue,
	                        denominator: denominator
	                    }));
	                }

	                var imageData = node.querySelector('imagedata');
	                if (imageData) {
	                    attrValue = imageData.attributes['o:title'] && imageData.attributes['o:title'].value;
	                    if (attrValue) {
	                        el.properties.title = attrValue;
	                    }

	                    attrValue = imageData.attributes['r:id'] && imageData.attributes['r:id'].value;
	                    if (attrValue) {
	                        var media = (0, _getMediaFromRelationship2['default'])(attrValue, documentData);

	                        if (media) {
	                            el.style.backgroundImage = 'url(\'' + media.data + '\')';
	                            el.style.backgroundRepeat = 'no-repeat';
	                        }
	                    }
	                }

	                result.children.push(el);
	            } else if (localName === 'rect') {
	                attrValue = node.attributes.style && node.attributes.style.value;
	                if (attrValue) {
	                    merge(el.style, (0, _parseStyleAttribute2['default'])({
	                        src: attrValue,
	                        denominator: denominator
	                    }));
	                }

	                var textBox = node.querySelector('textbox');
	                if (textBox) {
	                    var textBoxContent = textBox.querySelector('txbxContent');

	                    forEach.call(textBoxContent && textBoxContent.childNodes || [], function (node) {
	                        if (node.localName === 'p') {
	                            el.children.push((0, _parseParagraph2['default'])({
	                                node: node,
	                                documentData: documentData
	                            }));
	                        }
	                    });
	                }

	                result.children.push(el);
	            }
	        });
	    }

	    return result;
	};

	module.exports = exports['default'];

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _JsFile = __webpack_require__(1);

	var cropUnit = _JsFile.Engine.cropUnit;

	var sides = ['width', 'height', 'left', 'top'];
	/**
	 *
	 * @param params
	 * @returns {*}
	 */

	exports['default'] = function (params) {
	    var styles = {};
	    var _params$value = params.value;
	    var value = _params$value === undefined ? '' : _params$value;
	    var _params$denominator = params.denominator;
	    var denominator = _params$denominator === undefined ? 1 : _params$denominator;

	    String(value).split(';').forEach(function (rule) {
	        var stylePartitionData = rule.split(':');
	        var name = stylePartitionData[0];
	        var value = stylePartitionData[1] || '';

	        if (sides.indexOf(name) >= 0) {
	            styles[name] = {
	                value: cropUnit(value.trim()) / denominator,
	                unit: 'pt'
	            };
	        } else if (name === 'visibility' || name === 'position') {
	            styles[name] = value.trim();
	        }
	    });

	    return styles;
	};

	;
	module.exports = exports['default'];

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _JsFile = __webpack_require__(1);

	var _JsFile2 = _interopRequireDefault(_JsFile);

	var _parseTableProperties = __webpack_require__(21);

	var _parseTableProperties2 = _interopRequireDefault(_parseTableProperties);

	var _parseTableRowProperties = __webpack_require__(34);

	var _parseTableRowProperties2 = _interopRequireDefault(_parseTableRowProperties);

	var _parseTableColProperties = __webpack_require__(35);

	var _parseTableColProperties2 = _interopRequireDefault(_parseTableColProperties);

	var Document = _JsFile2['default'].Document;
	var _JsFile$Engine = _JsFile2['default'].Engine;
	var merge = _JsFile$Engine.merge;
	var clone = _JsFile$Engine.clone;

	/**
	 *
	 * @param params
	 * @returns {*}
	 */

	exports['default'] = function (params) {
	    var node = params.node;
	    var documentData = params.documentData;
	    var parseDocumentContentNodes = params.parseDocumentContentNodes;

	    if (!node || !documentData) {
	        return Promise.reject();
	    }

	    var rowProperties = undefined;
	    var thead = undefined;
	    var forEach = [].forEach;
	    var tbody = Document.elementPrototype;
	    var queue = [Document.elementPrototype];
	    var tableProperties = {
	        style: {},
	        properties: documentData.styles.defaults.tableProperties && clone(documentData.styles.defaults.tableProperties.properties) || {}
	    };
	    var colProperties = clone(tableProperties.colProperties);
	    queue[0].properties.tagName = 'TABLE';
	    tbody.properties.tagName = 'TBODY';

	    forEach.call(node && node.childNodes || [], function (node) {
	        var localName = node.localName;

	        if (localName === 'tblPr') {
	            merge(tableProperties, (0, _parseTableProperties2['default'])(node));
	            merge(colProperties, tableProperties.colProperties);
	        } else if (localName === 'tblGrid') {
	            Array.prototype.forEach.call(node.querySelectorAll('gridCol'), function (_ref) {
	                var attributes = _ref.attributes;

	                var el = Document.elementPrototype;
	                var attrValue = attributes['w:w'] && attributes['w:w'].value;

	                el.properties.tagName = 'COL';
	                if (attrValue) {
	                    el.style.width = {
	                        value: attrValue / 20,
	                        unit: 'pt'
	                    };
	                }

	                queue[0].children.push(el);
	            });
	        } else if (localName === 'tr') {
	            (function () {
	                var row = Document.elementPrototype;
	                var localColProperties = colProperties;
	                row.properties.tagName = 'TR';

	                //clear old value
	                rowProperties = {};

	                forEach.call(node && node.childNodes || [], function (node) {
	                    var localName = node.localName;

	                    // TODO: parse tblPrEx (Table Property Exceptions)
	                    if (localName === 'trPr') {
	                        rowProperties = (0, _parseTableRowProperties2['default'])(node);
	                        merge(row.style, rowProperties.style);
	                        merge(tableProperties, rowProperties.tableProperties);
	                        localColProperties = merge({}, localColProperties, rowProperties.colProperties);
	                    } else if (localName === 'tc') {
	                        (function () {
	                            var col = Document.elementPrototype;
	                            var nodes = [].slice.call(node && node.childNodes || [], 0);
	                            col.properties.tagName = 'TD';

	                            if (nodes[0]) {
	                                if (nodes[0].localName === 'tcPr') {
	                                    localColProperties = merge({}, localColProperties, (0, _parseTableColProperties2['default'])(nodes.shift()));
	                                }

	                                queue.push(parseDocumentContentNodes({
	                                    nodes: nodes,
	                                    documentData: documentData
	                                }).then(function (response) {
	                                    return col.children = response[0][0];
	                                }));
	                            }

	                            merge(col.style, localColProperties.style);
	                            merge(col.properties, localColProperties.properties);
	                        })();
	                    }
	                });

	                if (rowProperties.tblHeader) {
	                    if (!thead) {
	                        thead = Document.elementPrototype;
	                        thead.properties.tagName = 'THEAD';
	                    }

	                    thead.children.push(row);
	                } else {
	                    tbody.children.push(row);
	                }
	            })();
	        }
	    });

	    merge(queue[0].style, tableProperties);
	    if (thead) {
	        queue[0].children.push(thead);
	    }

	    queue[0].children.push(tbody);
	    return Promise.all(queue);
	};

	module.exports = exports['default'];

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _JsFile = __webpack_require__(1);

	var _JsFile2 = _interopRequireDefault(_JsFile);

	var _normalizeSideValue = __webpack_require__(20);

	var _normalizeSideValue2 = _interopRequireDefault(_normalizeSideValue);

	exports['default'] = function (node) {
	    var result = {
	        style: {}
	    };

	    [].forEach.call(node && node.childNodes || [], function (node) {
	        var attrValue = undefined;
	        var localName = node.localName;

	        switch (localName) {
	            case 'jc':
	                attrValue = (0, _normalizeSideValue2['default'])(node.attributes['w:val'] && node.attributes['w:val'].value);
	                if (attrValue) {
	                    result.style.textAlign = attrValue;
	                }

	                break;
	            case 'cantSplit':
	                result.cantSplit = true;
	                break;
	            case 'hidden':
	                result.style.display = 'none';
	                break;
	            case 'tblCellSpacing':
	                attrValue = Number(node.attributes['w:w'] && node.attributes['w:w'].value);
	                var type = node.attributes['w:type'] && node.attributes['w:type'].value;
	                if (attrValue && !isNaN(attrValue)) {
	                    result.tableProperties = result.tableProperties || {
	                        style: {}
	                    };
	                    result.tableProperties.style.borderCollapse = 'separate';
	                    result.tableProperties.style.borderSpacing = {
	                        unit: 'pt',
	                        value: attrValue / (type === 'nil' ? 1 : 20)
	                    };
	                }

	                break;
	            case 'tblHeader':
	                attrValue = node.attributes['w:val'] && node.attributes['w:val'].value;
	                if (attrValue !== 'false') {
	                    result.tblHeader = true;
	                }

	                break;
	        }
	    });

	    return result;
	};

	module.exports = exports['default'];

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _JsFile = __webpack_require__(1);

	var _JsFile2 = _interopRequireDefault(_JsFile);

	var _parseBorderProperties = __webpack_require__(19);

	var _parseBorderProperties2 = _interopRequireDefault(_parseBorderProperties);

	var _normalizeSideValue = __webpack_require__(20);

	var _normalizeSideValue2 = _interopRequireDefault(_normalizeSideValue);

	var _JsFile$Engine = _JsFile2['default'].Engine;
	var merge = _JsFile$Engine.merge;
	var normalizeColorValue = _JsFile$Engine.normalizeColorValue;
	var formatPropertyName = _JsFile$Engine.formatPropertyName;

	var verticalAlignValues = {
	    bottom: 'bottom',
	    top: 'top',
	    center: 'middle'
	};

	exports['default'] = function (node) {
	    var result = {
	        properties: {},
	        style: {}
	    };
	    var forEach = [].forEach;

	    forEach.call(node && node.childNodes || [], function (node) {
	        var attrValue = undefined;
	        var localName = node.localName;
	        var attributes = node.attributes;

	        switch (localName) {
	            case 'gridSpan':
	                attrValue = Number(attributes['w:val'] && attributes['w:val'].value);

	                if (attrValue && !isNaN(attrValue)) {
	                    result.properties.colSpan = attrValue;
	                }

	                break;

	            // TODO: parse hideMark. Maybe as tr.display = none
	            case 'noWrap':
	                result.style.whiteSpace = 'nowrap';
	                break;
	            case 'shd':
	                attrValue = attributes['w:fill'] && attributes['w:fill'].value;
	                if (attrValue) {
	                    result.style.backgroundColor = normalizeColorValue(node);
	                }

	                break;
	            case 'tcBorders':
	                merge(result.style, (0, _parseBorderProperties2['default'])(node));
	                var horizontalBorder = node.querySelector('insideH');
	                var verticalBorder = node.querySelector('insideV');

	                if (horizontalBorder || verticalBorder) {
	                    if (horizontalBorder) {
	                        merge(result.style, (0, _parseBorderProperties2['default'])(horizontalBorder));
	                    }

	                    if (verticalBorder) {
	                        merge(result.style, (0, _parseBorderProperties2['default'])(verticalBorder));
	                    }
	                }

	                break;

	            // TODO: parse tcFitText
	            case 'tcMar':
	                forEach.call(node && node.childNodes || [], function (_ref) {
	                    var localName = _ref.localName;
	                    var attributes = _ref.attributes;

	                    var side = formatPropertyName((0, _normalizeSideValue2['default'])(localName));
	                    var value = Number(attributes['w:w'] && attributes['w:w'].value);

	                    if (value && !isNaN(value) && side) {
	                        var type = attributes['w:type'] && attributes['w:type'].value;
	                        result.style['padding' + side] = {
	                            unit: 'pt',
	                            value: value / (type === 'nil' ? 1 : 20)
	                        };
	                    }
	                });

	                break;
	            case 'tcW':
	                attrValue = Number(attributes['w:w'] && attributes['w:w'].value);
	                if (attrValue && !isNaN(attrValue)) {
	                    var type = attributes['w:type'] && attributes['w:type'].value;
	                    result.style.width = {
	                        unit: 'pt'
	                    };

	                    if (type === 'pct') {
	                        result.style.width.unit = '%';
	                    } else if (!type || type !== 'nil') {
	                        attrValue /= 20;
	                    }

	                    result.style.width.value = attrValue;
	                }

	                break;
	            case 'vAlign':
	                attrValue = attributes['w:val'] && verticalAlignValues[attributes['w:val'].value];
	                if (attrValue) {
	                    result.style.verticalAlign = attrValue;
	                }

	                break;

	            // TODO: parse vMerge element
	        }
	    });

	    return result;
	};

	module.exports = exports['default'];

/***/ },
/* 36 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	if (!String.prototype.includes) {
	    String.prototype.includes = function () {
	        return String.prototype.indexOf.apply(this, arguments) !== -1;
	    };
	}

	exports["default"] = {};
	module.exports = exports["default"];

/***/ }
/******/ ])
});
;