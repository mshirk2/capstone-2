"use strict";

const express = require('express');
const Reservation = require("../models/reservation");
const router = express.Router();

router.get("/", async function (req, res, next){
    const filters = req.query;
    try {
        const reservations = await Reservation.findAll(filters);
        return res.json({ reservations });
    } catch (err) {
        return next(err);
    }
});

router.get("/:id", async function (req, res, next){
    try {
        const reservation = await Reservation.get(req.params.id);
        return res.json({ reservation });
    } catch (err) {
        return next(err);
    }
})

module.exports = router;