import * as bcrypt from 'bcrypt';
import { injectable } from "inversify";
import { IUser, UserSchema } from "../models/user";

@injectable()
export class UsersService {
    async createUser(userDto: IUser) {
        const salt = await bcrypt.genSalt(10);

        const user = new UserSchema({
            ...userDto,
            password: userDto.password ? await bcrypt.hash(userDto.password, salt) : null
        });

        await user.save();
    }

    getById(id: string) {
        return UserSchema.findById(id).select(['id', 'username', 'email']);
    }

    getByYandexId(id: string) {
        return UserSchema.findOne({ yandexId: id }).select(['id', 'username', 'email']);
    }

    getByUsername(username: string) {
        return UserSchema.findOne({ username }).select(['id', 'username', 'email']);
    }

    async verifyPassword(id: string, password: string): Promise<boolean> {
        const user: IUser = await UserSchema.findById(id);

        if (!user.password) {
            return false;
        }

        return bcrypt.compare(password, user.password);
    }
}