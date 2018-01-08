'use strict';

describe('listen', () => {
    it('success', (done) => {
        const express = new _ZIExpress({port: 8000, logger: true});
        express.listen(() => done());
    });
});
