'use strict';

describe('listen', () => {
    it('success', (done) => {
        const ziexpress = new _ZIExpress({
            port: 4000,
            ip: '0.0.0.0',
        });
        ziexpress.listen(() => done());
    });
});
