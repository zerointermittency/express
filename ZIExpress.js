'use strict';

const express = require('express'),
    BodyParser = require('body-parser'),
    compression = require('compression'),
    core = {
        middlewares: require('./core/middlewares'),
        debug: require('./core/debug.js'),
    },
    helmet = require('helmet');

class ZIExpress {
    constructor({port = 8080, ip = '0.0.0.0', options = {}} = {}) {
        if (!options.bodyParser)
            options.bodyParser = {
                json: {type: 'application/json', limit: '10mb'},
            };
        if (!options.ipHeaders) options.ipHeaders = ['x-web-for', 'x-forwarded-for'];
        this.core = express();
        this.port = port;
        this.ip = ip;
        this.core.use(compression());
        this.core.use(BodyParser.json(options.bodyParser.json));
        this.core.use(helmet(options.helmet));
        this.core.use(core.middlewares.ip(options.ipHeaders));
        /* istanbul ignore else */
        if (options.logger || typeof options.logger === 'undefined') {
            if (typeof options.logger != 'object') options.logger = {};
            options.logger.level = options.logger.level || 'warn';
            options.logger.format = options.logger.format || 'zi';
            this.core.use(core.middlewares.logger(options.logger));
        }
    }

    listen(cb) {
        const self = this,
            debug = core.debug('listen'),
            info = () => {
                debug(`run in "${self.ip}:${self.port}"`);
                /* istanbul ignore else */
                if (cb) cb();
            };
        self.core.listen(self.port, self.ip, info);
    }

    use(...args) {
        return this.core.use(args);
    }

    route(...args) {
        return this.core.route(args);
    }

    static Router(...args) {
        return express.Router(args);
    }

    Router(...args) {
        return this.constructor.Router(args);
    }
}

module.exports = ZIExpress;
