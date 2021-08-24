const assert = require('assert');
const UserEntity = require('../../../app/entity/user.entity');

describe('UserEntity', async () => {
    describe('hashPassword', async () => {
        it('Returns user object and with isHashed field is true and password is hashed', async () => {
            const [email, password] = ['aaa@aaa.com', '12345678'];
            const user = new UserEntity({email, password});
            await user.hashPassword();
            assert.equal(user.isHashed, true);
            assert.notEqual(user.password, password);
        });
    });

    describe('isValidPassword', async () => {
        it('Returns true if input password is equal to the user password', async () => {
            const [email, password] = ['aaa@aaa.com', '12345678'];
            const user = new UserEntity({email, password});
            const isValidPassword = await user.isValidPassword(password);
            assert.equal(isValidPassword, true);
        });

        it('Returns false if input password is not equal to the user password', async () => {
            const [email, password] = ['aaa@aaa.com', '12345678'];
            const user = new UserEntity({email, password});
            const isValidPassword = await user.isValidPassword(password + 1);
            assert.equal(isValidPassword, false);
        });
    });
});
