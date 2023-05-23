"use strict";

const request = require("supertest");

const app = require("../app");

const {
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
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);


/************************************** POST /reservations */

describe("POST /reservations", function(){
    test("works for admin", async function(){
        const resp = await request(app)
            .post("/reservations")
            .send({
                user_id: testUserIds[0],
                tool_id: testToolIds[0],
                is_active: true,
                start_date: '2023-05-23',
                due_date: '2023-05-24',
                returned_date: null
            })
            .set("authorization", `Bearer ${adminToken}`);
        expect(resp.statusCode).toEqual(201);
        expect(resp.body).toEqual({
            reservation: {
                id: expect.any(Number),
                user_id: testUserIds[0],
                tool_id: testToolIds[0],
                is_active: true,
                start_date: "2023-05-23T04:00:00.000Z",
                due_date: "2023-05-24T04:00:00.000Z",
                returned_date: null
            }
        });
    });

    test("works for non-admin", async function(){
        const resp = await request(app)
            .post("/reservations")
            .send({
                user_id: testUserIds[0],
                tool_id: testToolIds[0],
                is_active: true,
                start_date: '2023-05-23',
                due_date: '2023-05-24',
                returned_date: null
            })
            .set("authorization", `Bearer ${u1Token}`);
        expect(resp.statusCode).toEqual(201);
        expect(resp.body).toEqual({
            reservation: {
                id: expect.any(Number),
                user_id: testUserIds[0],
                tool_id: testToolIds[0],
                is_active: true,
                start_date: "2023-05-23T04:00:00.000Z",
                due_date: "2023-05-24T04:00:00.000Z",
                returned_date: null
            }
        });
    });

    test("unauth for anon", async function(){
        const resp = await request(app)
            .post("/reservations")
            .send({
                user_id: testUserIds[0],
                tool_id: testToolIds[0],
                is_active: true,
                start_date: '2023-05-23',
                due_date: '2023-05-24',
                returned_date: null
            });
        expect(resp.statusCode).toEqual(401);
    });
});

/************************************** GET /reservations */

describe("GET /reservations", function () {
    test("works for admin", async function () {
        const resp = await request(app)
            .get(`/reservations`)
            .set("authorization", `Bearer ${adminToken}`);
        expect(resp.body).toEqual({
            reservations: [
                {
                    id: testResIds[2],
                    user_id: testUserIds[2], 
                    tool_id: testToolIds[2], 
                    is_active: false, 
                    start_date: "2000-01-01T05:00:00.000Z",
                    start_formatted: 'Jan 01, 2000',
                    due_date: "2000-01-02T05:00:00.000Z",
                    due_formatted: 'Jan 02, 2000', 
                    diff: expect.any(Object),
                    returned_date: null,
                    returned_formatted: null,
                    title: 't3',
                    catalog_code: 3,
                    images: []
                },
                {
                    id: testResIds[0],
                    user_id: testUserIds[0], 
                    tool_id: testToolIds[0], 
                    is_active: true, 
                    start_date: "2023-05-22T04:00:00.000Z",
                    start_formatted: 'May 22, 2023',
                    due_date: "2023-05-23T04:00:00.000Z", 
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
                    start_date: "2023-06-01T04:00:00.000Z",
                    start_formatted: 'Jun 01, 2023',
                    due_date: "2023-06-02T04:00:00.000Z",
                    due_formatted: 'Jun 02, 2023',
                    diff: expect.any(Object),
                    returned_date: null,
                    returned_formatted: null,
                    title: 't2',
                    catalog_code: 2,
                    images: []
                }
            ],
        });
    });

    test("works for non-admin", async function () {
        const resp = await request(app)
            .get(`/reservations`)
            .set("authorization", `Bearer ${u1Token}`);
        expect(resp.body).toEqual({
            reservations: [
                {
                    id: testResIds[2],
                    user_id: testUserIds[2], 
                    tool_id: testToolIds[2], 
                    is_active: false, 
                    start_date: "2000-01-01T05:00:00.000Z",
                    start_formatted: 'Jan 01, 2000',
                    due_date: "2000-01-02T05:00:00.000Z",
                    due_formatted: 'Jan 02, 2000', 
                    diff: expect.any(Object),
                    returned_date: null,
                    returned_formatted: null,
                    title: 't3',
                    catalog_code: 3,
                    images: []
                },
                {
                    id: testResIds[0],
                    user_id: testUserIds[0], 
                    tool_id: testToolIds[0], 
                    is_active: true, 
                    start_date: "2023-05-22T04:00:00.000Z",
                    start_formatted: 'May 22, 2023',
                    due_date: "2023-05-23T04:00:00.000Z", 
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
                    start_date: "2023-06-01T04:00:00.000Z",
                    start_formatted: 'Jun 01, 2023',
                    due_date: "2023-06-02T04:00:00.000Z",
                    due_formatted: 'Jun 02, 2023',
                    diff: expect.any(Object),
                    returned_date: null,
                    returned_formatted: null,
                    title: 't2',
                    catalog_code: 2,
                    images: []
                }
            ],
        });
    });

    test("unauth for anon", async function () {
        const resp = await request(app)
            .get(`/reservations`);
        expect(resp.statusCode).toEqual(401);
    });
  
  
    test("works: no filter", async function () {
    const resp = await request(app)
        .get(`/reservations`)
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.body).toEqual({
        reservations: [
            {
                id: testResIds[2],
                user_id: testUserIds[2], 
                tool_id: testToolIds[2], 
                is_active: false, 
                start_date: "2000-01-01T05:00:00.000Z",
                start_formatted: 'Jan 01, 2000',
                due_date: "2000-01-02T05:00:00.000Z",
                due_formatted: 'Jan 02, 2000', 
                diff: expect.any(Object),
                returned_date: null,
                returned_formatted: null,
                title: 't3',
                catalog_code: 3,
                images: []
            },
            {
                id: testResIds[0],
                user_id: testUserIds[0], 
                tool_id: testToolIds[0], 
                is_active: true, 
                start_date: "2023-05-22T04:00:00.000Z",
                start_formatted: 'May 22, 2023',
                due_date: "2023-05-23T04:00:00.000Z", 
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
                start_date: "2023-06-01T04:00:00.000Z",
                start_formatted: 'Jun 01, 2023',
                due_date: "2023-06-02T04:00:00.000Z",
                due_formatted: 'Jun 02, 2023',
                diff: expect.any(Object),
                returned_date: null,
                returned_formatted: null,
                title: 't2',
                catalog_code: 2,
                images: []
            }
        ],
    });
  });

  test("works: filter by user_id", async function () {
    const resp = await request(app)
        .get(`/reservations`)
        .query({ user_id: testUserIds[0] })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.body).toEqual({
        reservations: [{
            id: testResIds[0],
            user_id: testUserIds[0], 
            tool_id: testToolIds[0], 
            is_active: true, 
            start_date: "2023-05-22T04:00:00.000Z",
            start_formatted: 'May 22, 2023',
            due_date: "2023-05-23T04:00:00.000Z", 
            due_formatted: 'May 23, 2023',
            diff: expect.any(Object),
            returned_date: null,
            returned_formatted: null,
            title: 't1',
            catalog_code: 1,
            images: []
        }]
    });
  });

  test("works: filter by tool_id", async function () {
    const resp = await request(app)
        .get(`/reservations`)
        .query({ tool_id: testToolIds[1] })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.body).toEqual({
        reservations: [{
            id: testResIds[1],
            user_id: testUserIds[1], 
            tool_id: testToolIds[1], 
            is_active: true, 
            start_date: "2023-06-01T04:00:00.000Z",
            start_formatted: 'Jun 01, 2023',
            due_date: "2023-06-02T04:00:00.000Z",
            due_formatted: 'Jun 02, 2023',
            diff: expect.any(Object),
            returned_date: null,
            returned_formatted: null,
            title: 't2',
            catalog_code: 2,
            images: []
        }]
    });
  });

  test("works: filter by is_active: true", async function () {
    const resp = await request(app)
        .get(`/reservations`)
        .query({ is_active: true })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.body).toEqual({
        reservations: [
            {
                id: testResIds[0],
                user_id: testUserIds[0], 
                tool_id: testToolIds[0], 
                is_active: true, 
                start_date: "2023-05-22T04:00:00.000Z",
                start_formatted: 'May 22, 2023',
                due_date: "2023-05-23T04:00:00.000Z", 
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
                start_date: "2023-06-01T04:00:00.000Z",
                start_formatted: 'Jun 01, 2023',
                due_date: "2023-06-02T04:00:00.000Z",
                due_formatted: 'Jun 02, 2023',
                diff: expect.any(Object),
                returned_date: null,
                returned_formatted: null,
                title: 't2',
                catalog_code: 2,
                images: []
            },
        ]
    });
  });

  test("works: filter by is_active: false", async function () {
    const resp = await request(app)
        .get(`/reservations`)
        .query({ is_active: false })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.body).toEqual({
        reservations: [{
            id: testResIds[2],
            user_id: testUserIds[2], 
            tool_id: testToolIds[2], 
            is_active: false, 
            start_date: "2000-01-01T05:00:00.000Z",
            start_formatted: 'Jan 01, 2000',
            due_date: "2000-01-02T05:00:00.000Z",
            due_formatted: 'Jan 02, 2000', 
            diff: expect.any(Object),
            returned_date: null,
            returned_formatted: null,
            title: 't3',
            catalog_code: 3,
            images: []
        }]
    });
  });

  test("bad request on invalid filter key", async function () {
    const resp = await request(app)
        .get(`/reservations`)
        .query({ nope: "nope" })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(400);
  });

  test("not found for no such reservation", async function () {
    const resp = await request(app)
        .get(`/reservations/444`)
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(404);
});
});

/************************************** GET /reservations/:id */

describe("GET /reservations/:id", function () {
    test("works for admin", async function () {
        const resp = await request(app)
            .get(`/reservations/${testResIds[0]}`)
            .set("authorization", `Bearer ${adminToken}`);
        expect(resp.body).toEqual({
            reservation: {
                id: testResIds[0],
                user_id: testUserIds[0], 
                tool_id: testToolIds[0], 
                is_active: true, 
                start_date: "2023-05-22T04:00:00.000Z", 
                due_date: "2023-05-23T04:00:00.000Z", 
                returned_date: null
            }
        });
    });

    test("works for non-admin", async function () {
        const resp = await request(app)
            .get(`/reservations/${testResIds[0]}`)
            .set("authorization", `Bearer ${u1Token}`);
        expect(resp.body).toEqual({
            reservation: {
                id: testResIds[0],
                user_id: testUserIds[0], 
                tool_id: testToolIds[0], 
                is_active: true, 
                start_date: "2023-05-22T04:00:00.000Z", 
                due_date: "2023-05-23T04:00:00.000Z", 
                returned_date: null
            }
        });
    });

    test("unauth for anon", async function () {
        const resp = await request(app)
            .get(`/reservations/${testResIds[0]}`);
        expect(resp.statusCode).toEqual(401);
    });

    test("not found for no such reservation", async function () {
        const resp = await request(app)
            .get(`/reservations/444`)
            .set("authorization", `Bearer ${adminToken}`);
        expect(resp.statusCode).toEqual(404);
    });
});

/************************************** PATCH /reservations/:id/complete */

describe("PATCH /reservations/:id/complete", () => {
    test("works for admins", async function () {
        const resp = await request(app)
            .patch(`/reservations/${testResIds[0]}/complete`)
            .set("authorization", `Bearer ${adminToken}`);
        expect(resp.body).toEqual({ completed: `${testResIds[0]}` });
    });
  
    test("works for same user", async function () {
        const resp = await request(app)
            .patch(`/reservations/${testResIds[0]}/complete`)
            .set("authorization", `Bearer ${u1Token}`);
        expect(resp.body).toEqual({ completed: `${testResIds[0]}` });
    });
  
    test("unauth for anon", async function () {
        const resp = await request(app)
            .patch(`/reservations/${testResIds[0]}/complete`)
        expect(resp.statusCode).toEqual(401);
    });
  
    test("not found if no such reservation", async function () {
        const resp = await request(app)
            .patch(`/reservations/999/complete`)
            .set("authorization", `Bearer ${adminToken}`);
        expect(resp.statusCode).toEqual(404);
    });
  });

/************************************** DELETE /reservations/:id */

describe("DELETE /reservations/:id", function () {
    test("works for admin", async function () {
        const resp = await request(app)
            .delete(`/reservations/${testResIds[0]}`)
            .set("authorization", `Bearer ${adminToken}`);
        expect(resp.body).toEqual({ deleted: `${testResIds[0]}` });
    });
  
    test("unauth for non-admin", async function () {
        const resp = await request(app)
            .delete(`/reservations/${testResIds[0]}`)
            .set("authorization", `Bearer ${u2Token}`);
        expect(resp.statusCode).toEqual(401);
    });
  
    test("unauth for anon", async function () {
        const resp = await request(app)
            .delete(`/reservations/${testResIds[0]}`);
        expect(resp.statusCode).toEqual(401);
    });
  
    test("not found if reservation missing", async function () {
        const resp = await request(app)
            .delete(`/reservations/999`)
            .set("authorization", `Bearer ${adminToken}`);
        expect(resp.statusCode).toEqual(404);
    });
  });