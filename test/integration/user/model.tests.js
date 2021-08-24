const assert = require('assert');
const db = require('../../lib/database.test');
const UserModel = require('../../lib/user.model.test');

describe('UserModel', async () => {
    const [validEmail, password] = ['aaa@aaa.com', '12345678'];
    const [invalidEmail, invalidPassword] = ['aaaaaa.com','123456789'];

    beforeEach(async () =>  {
        await db.clear('user');
    });

    describe('signUp', async () => {
        it('Valid email. Returns user object.', async () => {
            const user = await UserModel.signUp(validEmail, password);
            assert.equal(await user.isValidPassword(password), true);
            assert.equal(user.email, validEmail);
        });

        it('Invalid email. Throws error "Invalid email".', async () => {
            try {
                const user = await UserModel.signUp(invalidEmail, password);
                assert.fail(user);
            } catch (e) {
                assert.equal(e.message, 'Invalid email');
            }
        });
    });

    describe('signIn', async () => {
        it('Valid password. Returns token object.', async () => {
            await UserModel.signUp(validEmail, password);
            try {
                const signIn = await UserModel.signIn(validEmail, password);
                assert.ok(signIn);
            } catch (e) {
                assert.fail(e.message);
            }
        });

        it('Invalid password. Throws error "Wrong password".', async () => {
            await UserModel.signUp(validEmail, password);
            try {
                const res = await UserModel.signIn(validEmail, invalidPassword);
                assert.fail(res);
            } catch (e) {
                assert.equal(e.message, 'Wrong password');
            }
        });

        it('Invalid email. Throws error "Invalid email".', async () => {
            await UserModel.signUp(validEmail, password);
            try {
                const res = await UserModel.signIn(invalidEmail, password);
                assert.fail(res);
            } catch (e) {
                assert.equal(e.message, 'Invalid email');
            }
        });
    });
});