'use strict';

const ziexpress = new _ZIExpress({options: {logger: false}}),
    router = ziexpress.Router();

router.route('/ping')
    .get((req, res) => res.status(200).json({data: true}))
    .all((req, res) => res.status(405).json({error: {code: 4051}}));

ziexpress.use(router);

describe('Router', () => {
    const request = _chaiHttp.request(ziexpress.core);
    it('success: method GET', (done) => {
        request.get('/ping').end((err, res) => {
            _expect(res.status).to.be.equals(200);
            _expect(res.body.data).to.be.true;
            done();
        });
    });
    it('cacth: method != GET', (done) => {
        request.post('/ping').end((err, res) => {
            _expect(res.status).to.be.equal(405);
            _expect(res.body.error.code).to.be.equal(4051);
            done();
        });
    });
});
