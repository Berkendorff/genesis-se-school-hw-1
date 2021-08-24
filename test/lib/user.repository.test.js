const UserRepository = require('../../app/repository/user.repository');
const db = require('./database.test');

const userRepository = new UserRepository(db);

module.exports = userRepository;