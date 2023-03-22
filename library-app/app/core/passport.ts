require('dotenv').config();

import { container } from "../container";
import * as passport from "passport";
import { DoneCallback } from "passport";
import { Strategy } from 'passport-local';
import { UsersService } from "../services/usersService";
import { IUser } from "../models/user";
import { Strategy as YandexStrategy } from 'passport-yandex';

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
}));

passport.use(new YandexStrategy({
        clientID: process.env.YANDEX_CLIENT_ID,
        clientSecret: process.env.YANDEX_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/yandex/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
        const user = await usersRepo.getByYandexId(profile.id);

        if (!user) {
            const createUser = await usersRepo.createUser({
                username: profile.username,
                yandexId: profile.id,
                email: profile.emails.length > 0 ? profile.emails[0]?.value : '',
                password: null
            } as IUser);

            process.nextTick(() => done(null, createUser));
            return;
        }

        process.nextTick(() => done(null, user));
    }
));

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