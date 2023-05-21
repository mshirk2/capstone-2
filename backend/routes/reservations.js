"use strict";

const express = require('express');
const Reservation = require("../models/reservation");
const { ensureCorrectUserOrAdmin, ensureAdmin, ensureLoggedIn } = require("../middleware/auth");
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

router.get("/:id", ensureCorrectUserOrAdmin, async function (req, res, next){
    try {
        const reservation = await Reservation.get(req.params.id);
        return res.json({ reservation });
    } catch (err) {
        return next(err);
    }
});

router.patch("/:id/complete", async function (req, res, next){
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