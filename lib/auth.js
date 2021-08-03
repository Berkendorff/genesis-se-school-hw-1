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
                        throw new Error('Invalid Email')
                    }
                    const exist = await userRepository.findByEmail(email);
                    if (exist && exist.length == 1) {
                        throw new Error('Email already registered');
                    }
                    const user = await (new UserEntity({email, password})).hashPassword();
                    await userRepository.save(user);
                    return done(null, user);
                } catch (error) {
                    done(error);
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
                        throw new Error('Invalid Email')
                    }
                    const users = await userRepository.findByEmail(email);
                    if (!users || users.length == 0) {
                        return done(null, false, { message: 'User not found' });
                    }
                    const user = users[0];
        
                    const validate = await user.isValidPassword(password);
        
                    if (!validate) {
                        return done(null, false, { message: 'Wrong Password' });
                    }
    
                    return done(null, user, { message: 'Logged in Successfully' });
                } catch (error) {
                    return done(error);
                }
            }
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