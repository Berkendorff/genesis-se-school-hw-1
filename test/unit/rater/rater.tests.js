const assert = require('assert');
const db = require('../../lib/database.test');
const UserModel = require('../../lib/user.model.test');
const rater = require('../../../app/lib/rater');

describe('rater', async () => {
    it('Test of work', async () => {
        const response = rater();
        assert.equal(Number.isNaN(response), false);
    });
});