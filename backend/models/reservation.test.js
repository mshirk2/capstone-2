"use strict";

const { NotFoundError } = require("../expressError");
const db = require("../db.js");
const Reservation = require("./reservation.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testToolIds,
  testUserIds,
  testResIds
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** create */

describe("create", function () {
    const newRes = {
        is_active: true,
        start_date: '2023-05-22',
        due_date: '2023-05-23',
        returned_date: null,
    };

    test("works", async function () {
        let res = await Reservation.create({
            ...newRes,
            user_id: testUserIds[0],
            tool_id: testToolIds[2]
        });
        expect(res).toEqual({
            id: expect.any(Number), 
            returned_date: null,
            user_id: testUserIds[0],
            tool_id: testToolIds[2],
            is_active: true,
            start_date: expect.any(Date),
            due_date: expect.any(Date)
        });
        const found = await db.query(`SELECT * FROM reservations WHERE tool_id = ${testToolIds[2]}`);
        expect(found.rows.length).toEqual(1);
        expect(found.rows[0].user_id).toEqual(testUserIds[0]);
        expect(found.rows[0].is_active).toEqual(true);
    });
});

/************************************** findAll */

describe("findAll", function () {
  test("works", async function () {
    const res = await Reservation.findAll();
    expect(res).toEqual([
      {
        id: testResIds[0],
        user_id: testUserIds[0],
        tool_id: testToolIds[0],
        is_active: true,
        start_date: expect.any(Date),
        start_formatted: 'May 22, 2023',
        due_date: expect.any(Date),
        due_formatted: 'May 23, 2023',
        diff: expect.any(Object),
        returned_date: null,
        returned_formatted: null,
        title: 't1',
        catalog_code: 1,
        images: []
      },
      {
        id: testResIds[1],
        user_id: testUserIds[1],
        tool_id: testToolIds[1],
        is_active: true,
        start_date: expect.any(Date),
        start_formatted: 'Jun 01, 2023',
        due_date: expect.any(Date),
        due_formatted: 'Jun 02, 2023',
        diff: expect.any(Object),
        returned_date: null,
        returned_formatted: null,
        title: 't2',
        catalog_code: 2,
        images: []
      },
    ]);
  });
});

/************************************** get */

describe("get", function () {
  test("works", async function () {
    let res = await Reservation.get(testResIds[0]);
    expect(res).toEqual({
        id: testResIds[0],
        user_id: testUserIds[0],
        tool_id: testToolIds[0],
        is_active: true,
        start_date: expect.any(Date),
        due_date: expect.any(Date),
        returned_date: null,
    });
  });

  test("not found if no such reservation", async function () {
    try {
      await Reservation.get(99999);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

/************************************** complete */

describe("complete", function () {

  test("works", async function () {
    await Reservation.complete(testResIds[0]);
    const res = await db.query(
        `SELECT * FROM reservations WHERE id = ${testResIds[0]}`)
    expect(res.rows).toEqual([{
        id: testResIds[0],
        user_id: testUserIds[0],
        tool_id: testToolIds[0],
        is_active: false,
        start_date: expect.any(Date),
        due_date: expect.any(Date),
        returned_date: expect.any(Date)
    }]);
  });

  test("not found if no such res", async function () {
    try {
      await Reservation.complete(99999);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

/************************************** delete */

describe("delete", function () {
  test("works", async function () {
    await Reservation.delete(testResIds[0]);
    const res = await db.query(
        `SELECT * FROM reservations WHERE id = ${testResIds[0]}`);
    expect(res.rows.length).toEqual(0);
  });

  test("not found if no such user", async function () {
    try {
      await Reservation.delete(9999);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});