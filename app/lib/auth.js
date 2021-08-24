const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const AuthService = (userModel) => {
    passport.use(
        'create',
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password'
            },
            async (email, password, done) => {
                try {
                    const user = await userModel.signUp(email, password);
                    return done(null, user, { message: 'User created successfully' });
                } catch (error) {
                    return done(error);
                }
            },
        )
    );

    passport.use(
        'login',
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password'
            },
            async (email, password, done) => {
                try {
                    const user = await userModel.signIn(email, password);
                    return done(null, user, { message: 'Logged in successfully' });
                } catch (error) {
                    return done(error);
                }
            },
        )
    );

    passport.use(
        new JWTstrategy(
            {
                secretOrKey: 'TOP_SECRET',
                jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
            },
            async (token, done) => {
                try {
                    return done(null, token.user);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );
    return passport;
}

module.exports = AuthService;