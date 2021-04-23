const db = require('../db');
const { ResourceNotFoundError } = require('../expressError');

class Drink {
//     static async create
//     static async update
     static async get() {
         const result = await db.query(`SELECT id, name, maker, abv, description, untappd_id, untappd_rating, img_url FROM items`);
         return result.rows;
     }
     static async getById(id) {
         const result = await db.query(`SELECT id, name, maker, abv, description, untappd_id, untappd_rating, img_url FROM items WHERE id=$1`, [id]);
         if (!result.rows.length) {
             throw new ResourceNotFoundError;
         }
         return result.rows[0];
     }
//     static async delete
};

module.exports = Drink;