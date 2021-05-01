const db = require('../db');
const { ExpressError } = require('../expressError')

class PlaceRatings {
    static async getPlaceRatings() {
        const result = await db.query(`SELECT user_id, place_id, rating FROM user_place_ratings`);
        return result.rows;
    }
}

module.exports = PlaceRatings;