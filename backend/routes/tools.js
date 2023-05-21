"use strict";

const jsonschema = require("jsonschema");
const express = require('express');
const { BadRequestError } = require("../expressError");
const Tool = require ("../models/tool");
const toolSearchSchema = require("../schemas/toolSearch.json");
const { ensureLoggedIn } = require("../middleware/auth");

const router = express.Router();

router.get("/", async function (req, res, next){
    const filters = req.query;

    try {
        // Validate filters with tool schema
        const validator = jsonschema.validate(filters, toolSearchSchema);
        if(!validator.valid){
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const tools = await Tool.findAll(filters);
        return res.json({ tools });
    } catch (err) {
        return next(err);
    }
});

router.get("/:id", ensureLoggedIn, async function (req, res, next){
    try {
        const tool = await Tool.get(req.params.id);
        return res.json({ tool });
    } catch (err) {
        return next(err);
    }
})

module.exports = router;