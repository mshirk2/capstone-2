"use strict";

const express = require("express");
const jsonschema = require("jsonschema");
const { BadRequestError } = require("../expressError");
const { createToken } = require("../helpers/tokens");
const User = require("../models/user");
const userAuthSchema = require("../schemas/userAuth.json");
const userRegisterSchema = require("../schemas/userRegister.json");

const router = new express.Router();

// POST /auth/token: { username, password } => { token }
// Returns JWT token which can be used to authenticate future requests

router.post("/token", async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, userAuthSchema);
        if (!validator.valid) {
          const errs = validator.errors.map(e => e.stack);
          throw new BadRequestError(errs);
        }

        const { username, password } = req.body;
        const user = await User.authenticate(username, password);
        const token = createToken(user);
        return res.json({ user, token });
    } catch (err) {
        return next(err);
    }
});

// POST /auth/register: { user } => { token }
// Returns JWT token which can be used to authenticate future requests

router.post("/register", async function (req, res, next) {
    try {
      const validator = jsonschema.validate(req.body, userRegisterSchema);
      if (!validator.valid) {
        const errs = validator.errors.map(e => e.stack);
        throw new BadRequestError(errs);
      }
      const newUser = await User.register({ ...req.body, isAdmin: false });
      const token = createToken(newUser);
      return res.status(201).json({ newUser, token });
    } catch (err) {
      return next(err);
    }
});

module.exports = router;