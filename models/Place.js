const db = require('../db');
const { ResourceNotFoundError } = require('../expressError');

class Place {
    static async create(data) {
        const result = await db.query(
            `INSERT INTO venues 
            (${Object.keys(data).join(',')}) 
            VALUES 
            (${Object.values(data).map((v,i) => `$${i + 1}`).join(",")})
            RETURNING *`, Object.values(data)
        );
        return result.rows[0];
    }
//     static async update
    static async get() {
        const result = await db.query(`SELECT name, address, city, state, zip, lat, lng, url, phone FROM venues`);
        return result.rows;
    }
    static async getById(id) {
        const result = await db.query(`SELECT name, address, city, state, zip, lat, lng, url, phone FROM venues WHERE id=$1`, [id]);
        if (!result.rows.length) {
            throw new ResourceNotFoundError();
        }
        return result.rows[0];
    }
    
    static async delete(id) {
        const result = await db.query(`DELETE FROM venues WHERE id=$1 RETURNING id`, [id]);
        if (!result.rows.length) {
            throw new ResourceNotFoundError();
        }
    }
};

module.exports = Place;