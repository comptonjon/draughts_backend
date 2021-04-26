const db = require('../db');

class PlaceOwners {
    static async getPlaceOwners() {
        const result = await db.query(`SELECT venue_id AS place_id, user_id FROM venue_owners`);
        return result.rows;
    }
}

module.exports = PlaceOwners;