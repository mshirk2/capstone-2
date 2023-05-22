"use strict";

const express = require("express");
const jsonschema = require("jsonschema");
const { ensureCorrectUserOrAdmin, ensureAdmin } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");
const userNewSchema = require("../schemas/userNew.json");
const userUpdateSchema = require("../schemas/userUpdate.json");

const router = express.Router();

// POST / { user } => { user, token }
// Method for admin to add new user

router.post("/", ensureAdmin, async function (req, res, next) {
    try {
      const validator = jsonschema.validate(req.body, userNewSchema);
      if (!validator.valid) {
        const errs = validator.errors.map(e => e.stack);
        throw new BadRequestError(errs);
      }
  
      const user = await User.register(req.body);
      const token = createToken(user);
      return res.status(201).json({ user, token });
    } catch (err) {
      return next(err);
    }
});

// GET / => { users: [ {username, firstName, lastName, email }, ... ] }
// Returns list of all users

router.get("/", ensureAdmin, async function (req, res, next) {
    try {
        const users = await User.findAll();
        return res.json({ users });
    } catch (err) {
        return next(err);
    }
});

// GET /[id] => { user }
// Returns user

router.get("/:id", async function (req, res, next) {
    try {
        const user = await User.get(req.params.id);
        return res.json({ user });
    } catch (err) {
        return next(err);
    }
});

// PATCH /[id] { user } => { user }
// Update user

router.patch("/:id", async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, userUpdateSchema);
        if (!validator.valid) {
        const errs = validator.errors.map(e => e.stack);
        throw new BadRequestError(errs);
        }

        const user = await User.update(req.params.id, req.body);
        return res.json({ user });
    } catch (err) {
        return next(err);
    }
});


// DELETE /[id]  =>  { deleted: id }
// Delete user

router.delete("/:id", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
        await User.remove(req.params.id);
        return res.json({ deleted: req.params.id });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;