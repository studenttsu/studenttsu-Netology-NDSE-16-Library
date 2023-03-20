import { container } from "../container";
import * as passport from "passport";
import { DoneCallback } from "passport";
import { Strategy } from 'passport-local';
import { UsersService } from "../services/usersService";
import { IUser } from "../models/user";

const usersRepo = container.get(UsersService);

passport.use('local', new Strategy({
    usernameField: "username",
    passwordField: "password",
}, async (username: string, password: string, done: DoneCallback) => {
    const user: IUser = await usersRepo.getByUsername(username);

    if (!user) {
        done(null, false);
    }

    if (!await usersRepo.verifyPassword(user.id, password)) {
        return done(null, false);
    }

    return done(null, user);
}))

passport.serializeUser((user: any, cb) => {
    cb(null, user.id)
})

passport.deserializeUser( async (id: string, cb) => {
    const user = await usersRepo.getById(id);

    if (!user) {
        cb(null, false);
    }

    cb(null, user);
});