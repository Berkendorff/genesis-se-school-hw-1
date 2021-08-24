const path = require('path');
const express = require('express');
const passport = require('passport');

const Database = require('../lib/database');

const routes = require('./routes/routes');
const secureRoutes = require('./routes/secureRoutes');
const UserRepository = require('./repository/user.repository');
const UserModel = require('./model/user.model');
const AuthMiddleware = require('../lib/auth');

const {filePath, fileName} = require('./config/database')();
const {port} = require('./config/server')();
const dbPath = path.join(__dirname, filePath, fileName);

const server = () => {
    const app = express();
    const db = new Database(dbPath);
    const userRepository = new UserRepository(db);
    const userModel = new UserModel(userRepository);
    AuthMiddleware(userModel);

    app.use(express.static(__dirname + '/app/static'));
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.use('/', routes());
    app.use('/', passport.authenticate('jwt', { session: false }), secureRoutes());

    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({ error: JSON.stringify(err.message) });
        next();
    });

    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}/index.html`);
    });
    return app;
};

module.exports = server;


