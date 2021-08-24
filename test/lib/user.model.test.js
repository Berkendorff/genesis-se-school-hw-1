const path = require('path');
const UserModel = require('../../app/model/user.model');

const userRepository = require('./user.repository.test');
const userModel = new UserModel(userRepository);

module.exports = userModel;