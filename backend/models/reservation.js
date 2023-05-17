"use strict";

const db = require("../db");

class Reservation {
    static async create(data){
        const result = await db.query(
            `INSERT INTO reservations (
                user_id,
                tool_id,
                start_date,
                end_date)
            VALUES ($1, $2, $3, $4)
            RETURNING
                id,
                user_id,
                tool_id,
                start_date,
                end_date`,
            [
                data.user_id,
                data.tool_id,
                data.start_date,
                data.end_date
            ],
        );

        return result.rows[0];
    }

    // Find all reservations, with optional filter by user_id
    static async findAll({ user_id } = {}) {
        let query =
            `SELECT r.id,
                    r.user_id,
                    r.tool_id,
                    r.start_date,
                    TO_CHAR(r.start_date, 'Mon dd, yyyy') start_formatted,
                    r.end_date,
                    TO_CHAR(r.end_date, 'Mon dd, yyyy') end_formatted,
                    r.end_date - now() AS diff,
                    t.title,
                    t.catalog_code
            FROM reservations r
                JOIN tools t ON t.id = r.tool_id`;
            
        if(user_id !== undefined) {
            query += ` WHERE r.user_id = ${user_id}`
        }

        query += ' ORDER BY end_date '

        const result = await db.query(query);

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
                    start_date,
                    end_date
            FROM reservations
            WHERE id = $1`, [id]
        );

        return result.rows[0];
    }

    static async remove(id) {
        let result = await db.query(
            `DELETE
            FROM reservations
            WHERE id = $1
            RETURNING id`, 
            [id],
        );

        const reservation = result.rows[0];

        if (!reservation) throw new NotFoundError(`No reservation found: ${id}`);
    }

}

module.exports = Reservation;