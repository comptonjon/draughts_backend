const db = require('../db');
const { ResourceNotFoundError } = require('../expressError');

class Place {
    static async create(data) {
        const result = await db.query(
            `INSERT INTO places 
            (${Object.keys(data).join(',')}) 
            VALUES 
            (${Object.values(data).map((v,i) => `$${i + 1}`).join(",")})
            RETURNING *`, Object.values(data)
        );
        return result.rows[0];
    }

    static async update(id, data) {
        const result = await db.query(
            `UPDATE places
            SET
            ${Object.keys(data).map((k, i) => `${k}=$${i + 1}`).join(",")}
            WHERE
            id=$${Object.keys(data).length + 1}
            RETURNING *`, [...Object.values(data), id]
        );
        if (!result.rows.length) {
            throw new ResourceNotFoundError();
        }
        return result.rows[0];
    }

    static async get() {
        const result = await db.query(`SELECT id, name, address, city, state, zip, lat, lng, url, phone FROM places`);
        return result.rows;
    }

    static async getById(id) {
        const result = await db.query(`SELECT id, name, address, city, state, zip, lat, lng, url, phone FROM places WHERE id=$1`, [id]);
        if (!result.rows.length) {
            throw new ResourceNotFoundError();
        }
        return result.rows[0];
    }

    static async getDraughts(id) {
        const result = await db.query(`SELECT drink_id AS id, active FROM draughts WHERE place_id=$1`, [id]);
        return result.rows;
    }

    static async editDraughts(pid, did, active) {
        console.log("data", pid, did, active)
        const result = await db.query(`UPDATE draughts SET active=$1 WHERE drink_id=$2 AND place_id=$3 RETURNING *`, [active, did, pid]);
        if (!result.rows.length) {
            throw new ResourceNotFoundError();
        }
        return result.rows[0];
    }

    static async deleteDraught(pid, did) {
        const result = await db.query(`DELETE FROM draughts WHERE drink_id=$1 AND place_id=$2 RETURNING drink_id`, [did, pid]);
        if (!result.rows.length) {
            throw new ResourceNotFoundError();
        }
    }
    
    static async delete(id) {
        const result = await db.query(`DELETE FROM places WHERE id=$1 RETURNING id`, [id]);
        if (!result.rows.length) {
            throw new ResourceNotFoundError();
        }
    }
};

module.exports = Place;