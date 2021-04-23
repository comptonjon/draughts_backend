const { Client } = require('pg');

const DB_URI = process.env.NODE_ENV === 'development' ? process.env.DB_URI_TEST : process.env.DB_URI;

const db = new Client(
    {
        connectionString: DB_URI
    }
);

db.connect();

module.exports = db;