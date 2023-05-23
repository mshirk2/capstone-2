"use strict";

const db = require("../db.js");
const User = require("../models/user");
const Tool = require("../models/tool");
const Reservation = require("../models/reservation");
const { createToken } = require("../helpers/tokens");

const testToolIds = [];
const testUserIds = [];
const testResIds = [];

async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");
  await db.query("DELETE FROM tools");
  await db.query("DELETE FROM reservations")

  testToolIds[0] = (await Tool.create({
    title: "t1",
    catalogCode: 1,
    brand: "b1",
    model: "m1",
    condition: "c1",
    description: "d1",
    contents: "testcontents1"
  })).id;
  testToolIds[1] = (await Tool.create({
    title: "t2",
    catalogCode: 2,
    brand: "b2",
    model: "m2",
    condition: "c2",
    description: "d2",
    contents: "testcontents2"
  })).id;
  testToolIds[2] = (await Tool.create({
    title: "t3",
    catalogCode: 3,
    brand: "b3",
    model: "m3",
    condition: "c3",
    description: "d3",
    contents: "testcontents3"
  })).id;

  testUserIds[0] = (await User.register({
    username: "u1",
    firstName: "U1F",
    lastName: "U1L",
    email: "user1@user.com",
    password: "password1",
    isAdmin: false,
  })).id;
  testUserIds[1] = (await User.register({
    username: "u2",
    firstName: "U2F",
    lastName: "U2L",
    email: "user2@user.com",
    password: "password2",
    isAdmin: false,
  })).id;
  testUserIds[2] = (await User.register({
    username: "admin",
    firstName: "adminF",
    lastName: "adminL",
    email: "admin@user.com",
    password: "passwordadmin",
    isAdmin: true,
  })).id;

  testResIds[0] = (await Reservation.create({
    user_id: testUserIds[0], 
    tool_id: testToolIds[0], 
    is_active: true, 
    start_date: '2023-05-22', 
    due_date: '2023-05-23', 
    returned_date: null
  })).id;
  testResIds[1] = (await Reservation.create({
    user_id: testUserIds[1], 
    tool_id: testToolIds[1], 
    is_active: true, 
    start_date: '2023-06-01', 
    due_date: '2023-06-02', 
    returned_date: null
  })).id;
  testResIds[2] = (await Reservation.create({
    user_id: testUserIds[2], 
    tool_id: testToolIds[2], 
    is_active: false, 
    start_date: '2000-01-01', 
    due_date: '2000-01-02', 
    returned_date: null
  })).id;
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}

const u1Token = createToken({ username: "u1", id: testUserIds[0], isAdmin: false });
const u2Token = createToken({ username: "u2", id: testUserIds[1], isAdmin: false });
const adminToken = createToken({ username: "admin", id: testUserIds[2], isAdmin: true });

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testToolIds,
  testUserIds,
  testResIds,
  u1Token,
  u2Token,
  adminToken,
};
