const db = require('../db');
const { ExpressError } = require('../expressError')

class PlaceRatings {
    static async getPlaceRatings() {
        const result = await db.query(`SELECT * FROM user_venue_ratings`);
        return result.rows;
    }
}

module.exports = PlaceRatings;