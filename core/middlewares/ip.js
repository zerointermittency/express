'use strict';

module.exports = (req, res, next) => {
    req.ipInfo = req.headers['x-web-for'] || req.headers['x-forwarded-for'] || null;
    next();
};