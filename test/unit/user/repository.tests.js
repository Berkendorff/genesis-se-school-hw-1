const assert = require('assert');
const UserEntity = require('../../../app/entity/user.entity');
const db = require('../../lib/database.test');
const UserRepository = require('../../lib/user.repository.test');

describe('UserRepository', async () => {
    const [email, password] = ['aaa@aaa.com', '12345678'];
    const testUser = new UserEntity({email, password});

    beforeEach(async () =>  {
        await db.clear('user');
    });

    describe('save', async () => {
        it('Correct user. Returns the user object and write it to the db.', async () => {
            const testUserAfterSave = await UserRepository.save(testUser);
            assert.deepEqual(testUserAfterSave, testUser);
        });
    });



    describe('findByEmail', async () => {
        it('Existed email. Returns user object by the existed email.', async () => {
            await UserRepository.save(testUser);
            const foundedUser = await UserRepository.findByEmail(email);
            assert.deepEqual(foundedUser, testUser);
        });

        it('Not existed email. Returns null.', async () => {
            await UserRepository.save(testUser);
            const foundedUser = await UserRepository.findByEmail(email + 1);
            assert.deepEqual(foundedUser, null);
        });
    });

    describe('findAll', async () => {
        it('Returns user list object.', async () => {
            await UserRepository.save(testUser);
            const listOfUsers = await UserRepository.findAll();
            assert.equal(listOfUsers.length, 1);
            assert.deepEqual(listOfUsers[0], testUser);
        });
    });
});
