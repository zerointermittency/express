'use strict';

const Mocha = require('mocha'),
    mocha = new Mocha({reporter: process.env.REPORTER || 'spec'}),
    Path = require('wrapper-path'),
    path = new Path(`${__dirname}/../`);

global._path = path;
global._expect = require('chai').expect;
global._assert = require('chai').assert;
global._ZIDate = require('@zerointermittency/date');
global._stdout = require('test-console').stdout;
global._ZIExpress = require('../ZIExpress.js');
global._chaiHttp = {
    use: require('chai').use,
    Assertion: require('chai').Assertion,
};
_chaiHttp.use(require('chai-http'));

const files = path.recursive.files('/test/', {exclude: /test\/index.js$/g});
for (let i = files.length - 1; i >= 0; i--) mocha.addFile(files[i]);

// Run the tests.
mocha.run(() => process.exit());