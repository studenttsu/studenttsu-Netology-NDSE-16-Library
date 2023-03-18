const passport = require('passport');
const {Strategy: LocalStrategy} = require('passport-local');

const user = {
    id: 1,
    username: 'admin'
};

passport.use('local', new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
}, (username, password, done) => {
    if (username === 'admin' && password === 'admin') {
        return done(null, user);
    }

    return done(null, false);
}))

passport.serializeUser((user, cb) => {
    cb(null, user.id)
})

passport.deserializeUser( (id, cb) => {
    cb(null, user);
});