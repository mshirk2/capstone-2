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

    // Find all tools, with optional filter by user_id
    static async findAll({ user_id } = {}) {
        let query =
            `SELECT id,
                    user_id,
                    tool_id,
                    start_date,
                    end_date
            FROM reservations`;
            
        if(user_id !== undefined) {
            query += ` WHERE user_id = ${user_id}`
        }

        const result = await db.query(query);

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