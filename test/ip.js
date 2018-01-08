'use strict';

const express = new _ZIExpress();

express.route('/ipInfo')
    .get((req, res) => res.status(200).json({data: req.ipInfo}));

describe('ip', () => {
    const request = _chaiHttp.request(express.core);
    it('ip from "x-web-for"', (done) => {
        request.get('/ipInfo')
            .set('x-web-for', '200.111.103.18')
            .end((err, res) => {
                _expect(res.status).to.be.equals(200);
                _expect(res.body.data).to.be.equal('200.111.103.18');
                done();
            });
    });
    it('ip from "x-forwarded-for"', (done) => {
        request.get('/ipInfo')
            .set('x-forwarded-for', '200.111.103.18')
            .end((err, res) => {
                _expect(res.status).to.be.equals(200);
                _expect(res.body.data).to.be.equal('200.111.103.18');
                done();
            });
    });
    it('ip priority "x-web-for" => "x-forwarded-for" => null', (done) => {
        request.get('/ipInfo')
            .set('x-web-for', '200.111.103.18')
            .set('x-forwarded-for', '0.0.0.0')
            .end((err, res) => {
                _expect(res.status).to.be.equals(200);
                _expect(res.body.data).to.be.equal('200.111.103.18');
                done();
            });
    });
    it('ip null', (done) => {
        const expressDevelop = new _ZIExpress({environment: 'develop'});
        expressDevelop.route('/ipInfo')
            .get((req, res) => res.status(200).json({data: req.ipInfo}));
        const rq = _chaiHttp.request(expressDevelop.core);
        rq.get('/ipInfo')
            .end((err, res) => {
                _expect(res.status).to.be.equals(200);
                _expect(res.body.data).to.be.null;
                done();
            });
    });
});