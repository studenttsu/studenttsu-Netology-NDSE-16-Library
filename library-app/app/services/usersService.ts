import * as bcrypt from 'bcrypt';
import { injectableService } from "../container";
import { UserSchema } from "../models/user";

export class UsersService {
    constructor() {
        injectableService(this);
    }

    async createUser(userDto: any) {
        const salt = await bcrypt.genSalt(10);

        const user = new UserSchema({
            ...userDto,
            password: await bcrypt.hash(userDto.password, salt)
        });

        await user.save();
    }

    getById(id: string) {
        return UserSchema.findById(id).select(['id', 'username', 'email']);
    }

    getByUsername(username: string) {
        return UserSchema.findOne({ username }).select(['id', 'username', 'email']);
    }

    async verifyPassword(id: string, password: string) {
        const user = await UserSchema.findById(id);
        return bcrypt.compare(password, user.password);
    }
}