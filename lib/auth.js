const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserEntity = require('../app/entity/user.entity');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const {validateEmail} = require('./util');

module.exports = (userRepository) => {
    passport.use(
        'create',
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password'
            },
            async (email, password, done) => {
                try {
                    if (!validateEmail(email)) {
                        throw new Error('Invalid email')
                    }
                    const exist = await userRepository.findByEmail(email);
                    if (exist && exist.length == 1) {
                        throw new Error('Email already registered');
                    }
                    const user = await (new UserEntity({email, password})).hashPassword();
                    await userRepository.save(user);
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
                    if (!validateEmail(email)) {
                        throw new Error('Invalid email');
                    }
                    const users = await userRepository.findByEmail(email);
                    if (!users || users.length == 0) {
                        throw new Error('User not found');
                    }
                    const user = users[0];
                    const validate = await user.isValidPassword(password);
                    if (!validate) {
                        throw new Error('Wrong password');
                    }
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
                    done(error);
                }
            }
        )
    );
}