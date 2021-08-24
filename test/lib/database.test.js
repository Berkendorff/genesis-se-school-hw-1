const path = require('path');

const Database = require('../../app/lib/database');
const {filePath, fileName} = require('../config/database')();

const dbPath = path.join(__dirname, filePath, fileName);
const db = new Database(dbPath);

module.exports = db;