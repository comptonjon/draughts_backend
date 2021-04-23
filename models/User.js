const db = require('../db');

class User {
//     static async register
//     static async authenticate
//     static async update
     static async get() {
        const result = await db.query(`SELECT id, username, email, city, state, zip, is_owner FROM users`);
        return result.rows;
     }
//     static async getById
//     static async delete
}

module.exports = User;