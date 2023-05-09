"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");

class Tool {

    // Create a tool from data, update db, and return new tool data
    static async create(data) {
        const result = await db.query(
            `INSERT INTO tools (
                title,
                catalog_code,
                brand,
                model,
                condition,
                description,
                contents, 
                available)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING   
                id,
                title,
                catalog_code AS "catalogCode",
                brand,
                model,
                condition,
                description,
                contents, 
                available`,
            [
                data.title,
                data.catalogCode,
                data.brand,
                data.model,
                data.condition,
                data.description,
                data.contents,
                data.available
            ],
        );
        const tool = result.rows[0];
        return tool;
    }

    // Find all tools, with optional search filters title (finds case-insensitive, partial matches)
    static async findAll({ title } = {}) {
        let query = `SELECT id,
                            title,
                            catalog_code AS "catalogCode",
                            brand,
                            model,
                            condition,
                            description,
                            contents, 
                            available
                    FROM tools`;
        let queryValues = [];
        let whereExpressions = [];

        if (title !== undefined) {
            queryValues.push(`%${title}%`);
            whereExpressions.push(`title ILIKE $${queryValues.lengh}`);
        }

        if (whereExpressions.length > 0) {
            query += " WHERE " + whereExpressions.join(" AND ");
        }

        query += " ORDER BY title ";
        const result = await db.query(query, queryValues);

        return result.rows;
    }

    // Given a tool id, return all tool data
    static async get(id) {
        let result = await db.query(
            `SELECT id,
                    title,
                    catalog_code AS "catalogCode",
                    brand,
                    model,
                    condition,
                    description,
                    contents, 
                    available
            FROM tools
            WHERE id = $1`, [id]);
        const tool = result.rows[0];

        if(!tool) throw new NotFoundError(`No tool found: ${id}`);

        const tagResult = await db.query(
            `SELECT name
             FROM tags
                JOIN tools_tags AS tt ON tt.tag_id = tags.id
             WHERE tt.tool_id = $1`, [id]);
        tool.tags = tagResult.rows.map(tags => tags.name);

        const imageResult = await db.query(
            `SELECT url
             FROM images
                JOIN tools_images AS ti ON ti.image_id = images.id
             WHERE ti.tool_id = $1`, [id]);
  
        tool.images = imageResult.rows.map(images => images.url);

        return tool;
    }
}

module.exports = Tool;