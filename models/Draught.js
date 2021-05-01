const db = require('../db');

class Draught {
    static async getDraughts() {
        const result = await db.query(`SELECT place_id, drink_id, active FROM draughts`);
        return result.rows;
    }
};

module.exports = Draught;