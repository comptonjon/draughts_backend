const db = require('../db');
const { ResourceNotFoundError } = require('../expressError');

class Drink {

    static async create(data) {
        const result = await db.query(
            `INSERT INTO items 
            (${Object.keys(data).join(',')}) 
            VALUES 
            (${Object.values(data).map((v,i) => `$${i + 1}`).join(",")})
            RETURNING *`, Object.values(data)
        );
        return result.rows[0];
    }

    static async update(id, data) {
        const result = await db.query(
            `UPDATE items
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

    static async getDraughts(id) {
        const result = await db.query(`SELECT venue_id AS id FROM draughts WHERE item_id=$1 AND active=true`, [id]);
        return result.rows;
    }

    static async searchDrinks(query) {
        // SELECT * FROM items WHERE (name ILIKE '%an%' OR maker ILIKE '%an%') AND (name ILIKE '%le%' OR maker ILIKE '%le%')
        let queryString = `SELECT * FROM items`;
        let values = [];
        if (query !== "") {
            queryString += " WHERE "
            const queryTokens = query.split(" ");
            const variableString = queryTokens.map((t, i) => `(name ILIKE '%' || $${i + 1} || '%' OR maker ILIKE '%' || $${i + 1} || '%')`).join(" AND ");
            queryString += variableString;
            values = queryTokens;
        }
        const result = await db.query(queryString, values);
        return result.rows;
    }

    static async delete(id) {
        const result = await db.query(`DELETE FROM items WHERE id=$1 RETURNING id`, [id]);
        if (!result.rows.length) {
            throw new ResourceNotFoundError();
        }
    }
};

module.exports = Drink;