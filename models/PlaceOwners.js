const db = require('../db');

class PlaceOwners {
    static async getPlaceOwners() {
        const result = await db.query(`SELECT place_id, user_id FROM place_owners`);
        return result.rows;
    }
}

module.exports = PlaceOwners;