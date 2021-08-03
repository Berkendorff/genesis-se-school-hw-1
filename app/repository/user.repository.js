const User = require('../entity/user.entity');

class UserRepository {
    constructor(dbClient) {
        this.db = dbClient;
        this.entityName = 'user';
    }

    async findAll() {
        return await this.db.findAll(this.entityName);
    }

    async findByEmail(email) {
        const users = await this.db.findByKey(this.entityName, {key: 'email', value: email});
        return users && users.length > 0
            ? users.map((user) => new User(user))
            : [];
    }

    async save(user) {
        await this.db.write(this.entityName, user);
        return this;
    }
}

module.exports = UserRepository;