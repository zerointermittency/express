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

    constructor({port, ip, bodyParser, logger} = {}) {
        this.core = express();
        this.port = port || 8080;
        this.ip = ip || '0.0.0.0';
        this.core.use(compression());
        this.core.use(BodyParser.json(Object.assign(
            {type: 'application/json', limit: '10mb'},
            (bodyParser && bodyParser.json) ? bodyParser.json : {}
        )));
        this.core.use(helmet());
        this.core.use(core.middlewares.ip);
        if (typeof logger === 'boolean')
            logger = (logger) ? {level: 'warn', format: 'nunchee'} : false;
        if (logger) {
            logger.level = logger.level || 'warn';
            logger.format = logger.format || 'nunchee';
        }
        this.core.use(core.middlewares.logger(logger));
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

    use() {
        return this.core.use(...arguments);
    }

    route() {
        return this.core.route(...arguments);
    }

    static Router() {
        return express.Router(...arguments);
    }

    Router() {
        return this.constructor.Router(...arguments);
    }

}

module.exports = ZIExpress;