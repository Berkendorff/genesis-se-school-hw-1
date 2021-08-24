const {validateEmail} = require('../lib/util');
const UserEntity = require('../entity/user.entity');

class UserModel {
    constructor(_userRepository) {
        this.userRepository = _userRepository;
    }

    async signUp(email, password) {
        if (!validateEmail(email)) {
            throw new Error('Invalid email')
        }
        const exist = await this.userRepository.findByEmail(email);
        if (exist) {
            throw new Error('Email already registered');
        }
        const user = await (new UserEntity({email, password})).hashPassword();
        await this.userRepository.save(user);
        return user;
    }

    async signIn(email, password) {
        if (!validateEmail(email)) {
            throw new Error('Invalid email');
        }
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }
        const validate = await user.isValidPassword(password);
        if (!validate) {
            throw new Error('Wrong password');
        }
        return user;
    }
}

module.exports = UserModel;