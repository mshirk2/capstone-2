"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");

class Reservation {
    static async create(data){
        const result = await db.query(
            `INSERT INTO reservations (
                user_id,
                tool_id,
                is_active,
                start_date,
                due_date,
                returned_date)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING
                id,
                user_id,
                tool_id,
                is_active,
                start_date,
                due_date,
                returned_date`,
            [
                data.user_id,
                data.tool_id,
                data.is_active,
                data.start_date,
                data.due_date,
                data.returned_date
            ],
        );

        return result.rows[0];
    }

    // Find all reservations, with optional filter by user_id, tool_id or is_active
    static async findAll({ user_id, tool_id, is_active } = {}) {
        let query =
            `SELECT r.id,
                    r.user_id,
                    r.tool_id,
                    r.is_active,
                    r.start_date,
                    TO_CHAR(r.start_date, 'Mon dd, yyyy') start_formatted,
                    r.due_date,
                    TO_CHAR(r.due_date, 'Mon dd, yyyy') due_formatted,
                    r.due_date - now() AS diff,
                    r.returned_date,
                    TO_CHAR(r.returned_date, 'Mon dd, yyyy') returned_formatted,
                    t.title,
                    t.catalog_code
            FROM reservations r
                JOIN tools t ON t.id = r.tool_id`;
        let whereExpressions = [];

    // For each possible search term, add to whereExpressions and
    // queryValues so we can generate the right SQL
            
        if (user_id !== undefined) {
            whereExpressions.push(`r.user_id = ${user_id}`);
        }

        if (tool_id !== undefined) {
            whereExpressions.push(`r.tool_id = ${tool_id}`);
        }

        if (is_active === true){
            whereExpressions.push(`r.is_active = TRUE`);
        } else if (is_active === false) whereExpressions.push(`r.is_active = FALSE`);
        
        if (whereExpressions.length > 0) {
            query += " WHERE " + whereExpressions.join(" AND ");
        }
      
          // Finalize query and return results
        query += " ORDER BY r.due_date";
        const result = await db.query(query);

        if(!result) throw new NotFoundError(`No reservation found: ${id}`);

        for(let item of result.rows){
            const imageResult = await db.query(
                `SELECT url
                 FROM images
                    JOIN tools_images AS ti ON ti.image_id = images.id
                 WHERE ti.tool_id = $1`, [item.tool_id]);
      
            item.images = imageResult.rows.map(images => images.url);
        }

        return result.rows;
    }

    static async get(id){
        let result = await db.query (
            `SELECT id,
                    user_id,
                    tool_id,
                    is_active,
                    start_date,
                    due_date,
                    returned_date
            FROM reservations
            WHERE id = $1`, [id]
        );

        const reservation = result.rows[0]

        if(!reservation) throw new NotFoundError(`No reservation found: ${id}`);

        return reservation;
    }

    // Given reservation id, set returned date and make inactive
    static async complete(id){
        let result = await db.query (
            `UPDATE reservations
            SET returned_date = now(),
                is_active = FALSE
            WHERE id = $1
            RETURNING id`, [id]
        );

        const reservation = result.rows[0]

        if(!reservation) throw new NotFoundError(`No reservation found: ${id}`);

        return reservation;
    }

    static async delete(id) {
        let result = await db.query(
            `DELETE
            FROM reservations
            WHERE id = $1
            RETURNING id`, 
            [id],
        );

        const reservation = result.rows[0]

        if(!reservation) throw new NotFoundError(`No reservation found: ${id}`);
    }

}

module.exports = Reservation;