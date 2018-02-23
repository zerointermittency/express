'use strict';

const morgan = require('morgan'),
    ZIDate = require('@zerointermittency/date'),
    format = ':now :ip :url :method :auth :body :status :response :response-time ms';

morgan.token('now', () => (new ZIDate()).toISOString());
morgan.token('body', req => JSON.stringify(req.body));
morgan.token('auth', (req) => {
    return (req.headers.authorization) ? `{"Authorization": "${req.headers.authorization}"}` : '-';
});
morgan.token('ip', req => req.ipInfo);
morgan.token('response', (req, res) => res.response);
morgan.format('zi', morgan.compile(format));

module.exports = morgan;
