"use strict";

const request = require("supertest");

const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testToolIds,
  u1Token,
  adminToken,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);


/************************************** GET /tools */

describe("GET /tools", function () {
  test("works: no filter", async function () {
    const resp = await request(app).get(`/tools`);
    expect(resp.body).toEqual({
        tools: [
            {
                id: testToolIds[0],
                title: "t1",
                catalogCode: 1,
                brand: "b1",
                model: "m1",
                condition: "c1",
                description: "d1",
                contents: "testcontents1",
                images: [],
                tags: []
            },
            {
                id: testToolIds[1],
                title: "t2",
                catalogCode: 2,
                brand: "b2",
                model: "m2",
                condition: "c2",
                description: "d2",
                contents: "testcontents2",
                images: [],
                tags: []
            },
            {
                id: testToolIds[2],
                title: "t3",
                catalogCode: 3,
                brand: "b3",
                model: "m3",
                condition: "c3",
                description: "d3",
                contents: "testcontents3",
                images: [],
                tags: []
            },
        ],
    });
  });

  test("works: filter by title", async function () {
    const resp = await request(app)
        .get(`/tools`)
        .query({ title: 't1' });
    expect(resp.body).toEqual({
        tools: [{
            id: testToolIds[0],
            title: "t1",
            catalogCode: 1,
            brand: "b1",
            model: "m1",
            condition: "c1",
            description: "d1",
            contents: "testcontents1",
            images: [],
            tags: []
        }]
    });
  });

  test("bad request on invalid filter key", async function () {
    const resp = await request(app)
        .get(`/tools`)
        .query({ nope: "nope" });
    expect(resp.statusCode).toEqual(400);
  });
});

/************************************** GET /tools/:id */

describe("GET /tools/:id", function () {
    test("works for admin", async function () {
        const resp = await request(app)
            .get(`/tools/${testToolIds[0]}`)
            .set("authorization", `Bearer ${adminToken}`);
        expect(resp.body).toEqual({
            tool: {
                id: testToolIds[0],
                title: "t1",
                catalogCode: 1,
                brand: "b1",
                model: "m1",
                condition: "c1",
                description: "d1",
                contents: "testcontents1",
                images: [],
                tags: []
            }
        });
    });

    test("works for non-admin", async function () {
        const resp = await request(app)
            .get(`/tools/${testToolIds[0]}`)
            .set("authorization", `Bearer ${u1Token}`);
        expect(resp.body).toEqual({
            tool: {
                id: testToolIds[0],
                title: "t1",
                catalogCode: 1,
                brand: "b1",
                model: "m1",
                condition: "c1",
                description: "d1",
                contents: "testcontents1",
                images: [],
                tags: []
            }
        });
    });

    test("unauth for anon", async function () {
        const resp = await request(app)
            .get(`/tools/${testToolIds[0]}`);
        expect(resp.statusCode).toEqual(401);
    });

    test("not found for no such tool", async function () {
        const resp = await request(app)
            .get(`/tools/444`)
            .set("authorization", `Bearer ${adminToken}`);
        expect(resp.statusCode).toEqual(404);
    });
});