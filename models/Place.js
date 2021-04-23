const db = require('../db');

class Place {
//     static async create
//     static async update
    static async get() {
        const result = await db.query(`SELECT name, address, city, state, zip, lat, lng, url, phone FROM venues`);
        return result.rows;
    }
//     static async getById
//     static async delete
};

module.exports = Place;