const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post(
    '/user/create',
    passport.authenticate('create', { session: false }),
    async (req, res) => {
        res.json({
            message: 'Signup successful',
        });
    }
);

router.post(
    '/user/login',
    async (req, res, next) => {
        passport.authenticate(
            'login',
            async (err, user) => {
                try {
                    if (err || !user) {
                        const error = new Error({ message: 'An error occurred.'});
  
                        return next(error);
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
    }
);
  
module.exports = router;