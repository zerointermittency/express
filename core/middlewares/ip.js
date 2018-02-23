'use strict';

module.exports = headers => (req, res, next) => {
    req.ipInfo = null;
    for (let i = 0; i < headers.length; i++) {
        req.ipInfo = req.headers[headers[i]];
        if (req.ipInfo) break;
    }
    next();
};
