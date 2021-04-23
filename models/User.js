const db = require('../db');
const bcrypt = require('bcrypt');
const { ResourceNotFoundError, RequestConflictError, AuthenticationError } = require('../expressError');
const BCRYPT_WORK_FACTOR = process.env.BCRYPT_WORK_FACTOR || 12;


class User {
    static async register(data) {
        // Check for account in which username exists
        const uResult = await db.query(`SELECT id FROM users WHERE username=$1`, [data.username]);
        if (!uResult.rows.length) {
            //Check for duplicate email
            const eResult = await db.query(`SELECT id FROM users WHERE email=$1`, [data.email]);
            if (!eResult.rows.length) {
                const hashedPassword = await bcrypt.hash(data.password, +BCRYPT_WORK_FACTOR);
                // replace param password with hashed password
                data.password = hashedPassword;
                const result = await db.query(
                    `INSERT INTO users 
                    (${Object.keys(data).join(",")})
                    VALUES
                    (${Object.keys(data).map((k, i) => `$${i + 1}`).join(",")})
                    RETURNING *`, Object.values(data)
                );
                const newUser = result.rows[0];
                // remove password from return value
                delete newUser.password;
                return newUser;
            };
            throw new RequestConflictError("Email linked to existing account")
        }
        throw new RequestConflictError("Username already taken");
    }

    static async authenticate(username, password) {
        const result = await db.query(`SELECT * FROM users WHERE username=$1`, [username]);
        if (result.rows.length) {
            const user = result.rows[0];
            const goodPassword = await bcrypt.compare(password, user.password);
            if (goodPassword) {
                delete user.password;
                return user;
            }
        }
        throw new AuthenticationError();
    }
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