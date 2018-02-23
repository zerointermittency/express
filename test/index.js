'use strict';

const Mocha = require('mocha'),
    mocha = new Mocha({reporter: process.env.REPORTER || 'spec'}),
    WrapperPath = require('wrapper-path'),
    chai = require('chai'),
    chaiHttp = require('chai-http');

global._path = new WrapperPath(`${__dirname}/../`);
global._expect = chai.expect;
global._assert = chai.assert;
global._chaiHttp = chai.use(chaiHttp);
global._ZIDate = require('@zerointermittency/date');
global._stdout = require('test-console').stdout;
global._ZIExpress = require('../ZIExpress.js');

const files = _path.recursive.files('/test/', {exclude: /test\/index.js$/g});
for (let i = files.length - 1; i >= 0; i--) mocha.addFile(files[i]);

// Run the tests.
mocha.run(() => process.exit());
