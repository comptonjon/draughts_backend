const db = require('../db');
const { ExpressError } = require('../expressError')

class PlaceRatings {
    static async getPlaceRatings() {
        const result = await db.query(`SELECT user_id, venue_id AS place_id, rating FROM user_venue_ratings`);
        return result.rows;
    }
}

module.exports = PlaceRatings;