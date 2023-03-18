const bcrypt = require('bcrypt');
const {injectableService} = require('../container');
const {UserSchema} = require('../models/user');

class UsersService {
    async createUser(userDto) {
        const salt = await bcrypt.genSalt(10);

        const user = new UserSchema({
            ...userDto,
            password: await bcrypt.hash(userDto.password, salt)
        });

        await user.save();
    }

    getById(id) {
        return UserSchema.findById(id).select(['id', 'username', 'email']);
    }

    getByUsername(username) {
        return UserSchema.findOne({ username }).select(['id', 'username', 'email']);
    }

    async verifyPassword(id, password) {
        const user = await UserSchema.findById(id);
        return bcrypt.compare(password, user.password);
    }
}

exports.UsersService = injectableService(UsersService);