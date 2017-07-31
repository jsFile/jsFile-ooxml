# jsFile-ooxml 
[![Build Status](https://secure.travis-ci.org/jsFile/jsFile-ooxml.svg?branch=master)](https://travis-ci.org/jsFile/jsFile-ooxml) 
[![npm Version](https://img.shields.io/npm/v/jsfile-ooxml.svg)](https://www.npmjs.com/package/jsfile-ooxml)
[![Coverage Status](https://coveralls.io/repos/jsFile/jsFile-ooxml/badge.svg?branch=master&service=github)](https://coveralls.io/github/jsFile/jsFile-ooxml?branch=master)

Engine for jsFile library for working with documents in [OOXML](http://officeopenxml.com/) format (like .docx)

> ### :warning: This project is deprecated in favour of https://github.com/file2html/file2html

## Installation
### via NPM

You can install a <code>jsFile-ooxml</code> package very easily using NPM. After
installing NPM on your machine, simply run:
````
$ npm install jsfile-ooxml
````

### with Git

You can clone the whole repository with Git:
````
$ git clone git://github.com/jsFile/jsFile-ooxml.git
````

### from latest version

Also you can download [the latest release](https://github.com/jsFile/jsFile-ooxml/tree/master/dist) of `OOXML` engine and include built files to your project.


##Usage
````js
import JsFile from 'JsFile';
import JsFileOoxml from 'jsfile-ooxml';

const jf = new JsFile(file, options);
````
`file` - a file of [OOXML](http://officeopenxml.com/) type. You may find information about options and `jsFile` in [documentation](https://github.com/jsFile/jsFile#installation)
