const bcrypt = require('bcrypt');

class UserEntity {
    constructor({email, password, isHashed = false}){
        this.email = email;
        this.password = password;
        this.isHashed = isHashed;
        return this;
    }

    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
        this.isHashed = true;
        return this;
    }

    async isValidPassword(password) {
        if (!this.isHashed) {
            await this.hashPassword();
        }
        const isValid = await bcrypt.compare(password, this.password);
        return isValid;
    }
}

module.exports = UserEntity;