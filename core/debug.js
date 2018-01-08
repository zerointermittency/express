'use strict';

const debug = require('debug');

module.exports = (name) => debug(`zi-express:${name}`);