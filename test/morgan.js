'use strict';

const morgan = require('morgan');

describe('npm morgan', function() {
    const ziexpress = new _ZIExpress({options: {logger: false}}),
        ziexpressMorganStatusErrors = new _ZIExpress({options: {logger: false}}),
        format = morgan.compile(':method :url :status');
    morgan.format('jota', format);

    ziexpress.use(morgan('jota'));
    ziexpress.route('/test')
        .get((req, res) => res.status(200).json({data: true}));

    ziexpressMorganStatusErrors.use(
        morgan(':method :url :status', {skip: (req, res) => res.statusCode < 400})
    );
    ziexpressMorganStatusErrors.route('/test200')
        .get((req, res) => res.status(200).json({data: true}));
    ziexpressMorganStatusErrors.route('/test401')
        .get((req, res) => res.status(401).json({data: true}));

    it(':method :url :status', (done) => {
        let request = _chaiHttp.request(ziexpress.core),
            inspect = _stdout.inspect();
        request.get('/test').end((err, res) => {
            inspect.restore();
            _assert.equal(inspect.output[0], 'GET /test 200\n');
            _expect(res.status).to.be.equals(200);
            _expect(res.body.data).to.be.true;
            done();
        });
    });
    it(':method :url :status - skip statusCode < 400', (done) => {
        let request = _chaiHttp.request(ziexpressMorganStatusErrors.core),
            inspect = _stdout.inspect();
        request.get('/test200').end((err, res) => {
            inspect.restore();
            _expect(inspect.output[0]).to.be.undefined;
            _expect(res.status).to.be.equals(200);
            _expect(res.body.data).to.be.true;
            inspect = _stdout.inspect();
            request.get('/test401').end((err, res) => {
                inspect.restore();
                _assert.equal(inspect.output[0], 'GET /test401 401\n');
                _expect(res.status).to.be.equals(401);
                _expect(res.body.data).to.be.true;
                done();
            });
        });
    });
});

describe('morgan format nunchee', function() {
    const express = new _ZIExpress({
        options: {
            logger: {format: 'zi'},
            bodyParser: {json: {type: 'application/json'}},
        },
    });
    express.route('/test200')
        .get((req, res) => res.status(200).json({data: true}));
    express.route('/test401')
        .get((req, res) => res.status(401).json({data: true}))
        .post((req, res) => res.status(503).json({data: true}));
    const request = _chaiHttp.request(express.core);

    it('inactive logger if statusCode < 400', (done) => {
        const inspect = _stdout.inspect();
        request.get('/test200').end((err, res) => {
            inspect.restore();
            _expect(inspect.output[0]).to.be.undefined;
            _expect(res.status).to.be.equals(200);
            _expect(res.body.data).to.be.true;
            done();
        });
    });
    it('get active logger statusCode 401', (done) => {
        const inspect = _stdout.inspect();
        request
            .get('/test401')
            .end((err, res) => {
                inspect.restore();
                let date = (new _ZIDate()).toISOString(),
                    print = `${date} - /test401 GET - {} 401 {"data":true}`;
                _assert.equal(inspect.output[0].startsWith(print), true);
                _expect(res.status).to.be.equals(401);
                _expect(res.body.data).to.be.true;
                done();
            });
    });
    it('body array to post active logger statusCode 500', (done) => {
        const body = ['foo', 'bar'],
            inspect = _stdout.inspect();
        request
            .post('/test401')
            .set('Authorization', 'Basic c3BvcnRkZW1vOkBwUDJvMTY=')
            .send(body)
            .end((err, res) => {
                inspect.restore();
                let date = (new _ZIDate()).toISOString(),
                    print = `${date} - /test401 POST`;
                print += ' {"Authorization": "Basic c3BvcnRkZW1vOkBwUDJvMTY="}';
                print += ' ["foo","bar"] 503 {"data":true}';
                _assert.equal(inspect.output[0].startsWith(print), true);
                _expect(res.status).to.be.equals(503);
                _expect(res.body.data).to.be.true;
                done();
            });
    });
    it('post active logger statusCode 500', (done) => {
        const body = {foo: 'bar'},
            inspect = _stdout.inspect();
        request
            .post('/test401')
            .set('Authorization', 'Basic c3BvcnRkZW1vOkBwUDJvMTY=')
            .send(body)
            .end((err, res) => {
                inspect.restore();
                let date = (new _ZIDate()).toISOString(),
                    print = `${date} - /test401 POST`;
                print += ' {"Authorization": "Basic c3BvcnRkZW1vOkBwUDJvMTY="}';
                print += ' {"foo":"bar"} 503 {"data":true}';
                _assert.equal(inspect.output[0].startsWith(print), true);
                _expect(res.status).to.be.equals(503);
                _expect(res.body.data).to.be.true;
                done();
            });
    });
    it('get active logger statusCode 200', (done) => {
        const expressDevelop = new _ZIExpress({
            options: {logger: {level: 'debug'}},
        });

        expressDevelop.route('/test200')
            .get((req, res) => res.status(200).json({data: true}));
        const rq = _chaiHttp.request(expressDevelop.core),
            inspect = _stdout.inspect();
        rq.get('/test200')
            .end((err, res) => {
                inspect.restore();
                let date = (new _ZIDate()).toISOString(),
                    print = `${date} - /test200 GET - {} 200 {"data":true}`;
                _assert.equal(inspect.output[0].startsWith(print), true);
                _expect(res.status).to.be.equals(200);
                _expect(res.body.data).to.be.true;
                done();
            });
    });
    it('inactive logger', (done) => {
        const expressDevelop = new _ZIExpress({options: {
            logger: false},
        });

        expressDevelop.route('/test401')
            .get((req, res) => res.status(401).json({data: true}))
            .post((req, res) => res.status(503).json({data: true}));
        const rq = _chaiHttp.request(expressDevelop.core),
            inspect = _stdout.inspect();
        rq.get('/test401')
            .end((err, res) => {
                inspect.restore();
                _expect(inspect.output[0]).to.be.undefined;
                _expect(res.status).to.be.equals(401);
                _expect(res.body.data).to.be.true;
                done();
            });
    });
});
