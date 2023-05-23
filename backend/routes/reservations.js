"use strict";

const express = require('express');
const jsonschema = require("jsonschema");
const ResSearchSchema = require("../schemas/reservationSearch.json");
const Reservation = require("../models/reservation");
const { BadRequestError } = require("../expressError");
const { ensureAdmin, ensureLoggedIn } = require("../middleware/auth");
const router = express.Router();

router.get("/", ensureLoggedIn, async function (req, res, next){
    const q = req.query;
    // arrive as strings from querystring, but we want int/bool
    if(q.user_id !== undefined) q.user_id = +q.user_id;
    if(q.tool_id !== undefined) q.tool_id = +q.tool_id;
    if(q.is_active !== undefined) q.is_active = q.is_active === "true";

    try {
        // Validate filters with reservation schema
        const validator = jsonschema.validate(q, ResSearchSchema);
        if(!validator.valid){
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const reservations = await Reservation.findAll(q);
        return res.json({ reservations });
    } catch (err) {
        return next(err);
    }
});

router.get("/:id", ensureLoggedIn, async function (req, res, next){
    try {
        const reservation = await Reservation.get(req.params.id);
        return res.json({ reservation });
    } catch (err) {
        return next(err);
    }
});

router.patch("/:id/complete", ensureLoggedIn, async function (req, res, next){
    try {
        await Reservation.complete(req.params.id);
        return res.json({ completed: req.params.id });
    } catch (err) {
        return next(err);
    }
});

router.post("/", ensureLoggedIn, async function(req, res, next){
    try {
        const reservation = await Reservation.create(req.body)
        return res.status(201).json({ reservation });
    } catch (err){
        return next(err);
    }
})

router.delete("/:id", ensureAdmin, async function (req, res, next) {
    try {
        await Reservation.delete(req.params.id);
        return res.json({ deleted: req.params.id });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;