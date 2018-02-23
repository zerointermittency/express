'use strict';

const fs = {
        readdirSync: require('fs').readdirSync,
    },
    middlewares = {},
    files = fs.readdirSync(__dirname),
    omit = ['index.js'];

for (let i = files.length - 1; i >= 0; i--) {
    const key = files[i];
    if (omit.indexOf(key) !== -1) continue;
    middlewares[key.replace('.js', '')] = require(`${__dirname}/${key}`);
}

module.exports = middlewares;
