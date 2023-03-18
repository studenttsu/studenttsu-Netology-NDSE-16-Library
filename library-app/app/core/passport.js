const passport = require('passport');
const {Strategy: LocalStrategy} = require('passport-local');
const {container} = require('../container');
const {UsersService} = require('../services/usersService');

const usersRepo = container.get(UsersService);

passport.use('local', new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
}, async (username, password, done) => {
    const user = await usersRepo.getByUsername(username);

    if (!user) {
        done(null, false);
    }

    if (!await usersRepo.verifyPassword(user.id, password)) {
        return done(null, false);
    }

    return done(null, user);
}))

passport.serializeUser((user, cb) => {
    cb(null, user.id)
})

passport.deserializeUser( async (id, cb) => {
    const user = await usersRepo.getById(id);

    if (!user) {
        cb(null, false);
    }

    cb(null, user);
});