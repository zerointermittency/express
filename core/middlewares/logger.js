'use strict';

const morgan = require('../morgan.js');

module.exports = (logger) => {
    let status;
    if (logger.level && ['error', 'warn'].indexOf(logger.level) !== -1)
        status = 400;
    else status = 0;
    return [
        (req, res, next) => {
            const send = res.send;
            res.send = function(body) {
                res.response = body;
                send.call(this, body);
            };
            next();
        },
        morgan(
            logger.format, {skip: (req, res) => res.statusCode < status}
        ),
    ];
};
