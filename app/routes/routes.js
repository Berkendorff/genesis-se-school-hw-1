const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const routes = () => {
    router.post(
        '/user/create',
        passport.authenticate('create', { session: false }),
        async (req, res) => {
            res.json({
                message: 'Signup successful',
            });
        },
    );

    router.post(
        '/user/login',
        async (req, res, next) => {
            passport.authenticate(
                'login',
                async (err, user) => {
                    try {
                        if (err || !user) {
                            return next(err || new Error('An error occured'));
                        }

                        req.login(
                            user,
                            { session: false },
                            async (error) => {
                                if (error) return next(error);

                                const body = { email: user.email };
                                const token = jwt.sign({ user: body }, 'TOP_SECRET');

                                return res.json({ token });
                            }
                        );
                    } catch (error) {
                        return next(error);
                    }
                }
            )(req, res, next);
        },
    );
    return router;
}

module.exports = routes;