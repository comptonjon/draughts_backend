const db = require("../db");

class DrinkRatings {
    static async getDrinkRatings() {
        const result = await db.query(`SELECT user_id, rating, drink_id AS drink_id FROM user_drink_ratings`);
        return result.rows;
    }
}

module.exports = DrinkRatings;