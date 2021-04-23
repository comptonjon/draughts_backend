const db = require('../db');
const { ResourceNotFoundError } = require('../expressError');

class User {
//     static async register
//     static async authenticate
//     static async update
     static async get() {
        const result = await db.query(`SELECT id, username, email, city, state, zip, is_owner FROM users`);
        return result.rows;
     }

    static async getById(id) {
        const result = await db.query(`SELECT id, username, email, city, state, zip, is_owner FROM users WHERE id=$1`, [id]);
        if (!result.rows.length) {
            throw new ResourceNotFoundError();
        }
        return result.rows[0];
    }
    static async delete(id) {
        const result = await db.query(`DELETE FROM users WHERE id=$1 RETURNING id`, [id]);
        if (!result.rows.length) {
            throw new ResourceNotFoundError();
        }
    }
}

module.exports = User;