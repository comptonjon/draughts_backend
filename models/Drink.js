const db = require('../db');

class Drink {
//     static async create
//     static async update
     static async get() {
         const result = await db.query(`SELECT id, name, maker, abv, description, untappd_id, untappd_rating, img_url FROM items`);
         return result.rows;
     }
//     static async getById
//     static async delete
};

module.exports = Drink;