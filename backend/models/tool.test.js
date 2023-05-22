"use strict";

const { NotFoundError } = require("../expressError");
const db = require("../db.js");
const Tool = require("./tool.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testToolIds,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** create */

describe("create", function () {
  let newTool = {
    title: "testtitle",
    catalogCode: 999,
    brand: "testbrand",
    model: "testmodel",
    condition: "testcondition",
    description: "testdescription",
    contents: "testcontents"
  };

  test("works", async function () {
    let tool = await Tool.create(newTool);
    expect(tool).toEqual({
      ...newTool,
      id: expect.any(Number),
    });
    const found = await db.query("SELECT * FROM tools WHERE catalog_code = 999");
    expect(found.rows.length).toEqual(1);
    expect(found.rows[0].title).toEqual("testtitle");
    expect(found.rows[0].brand).toEqual("testbrand");
  });
});

/************************************** findAll */

describe("findAll", function () {
  test("works: no filter", async function () {
    let tools = await Tool.findAll();
    expect(tools).toEqual([
      {
        id: testToolIds[0],
        title: "t1",
        catalogCode: 1,
        brand: 'b1',
        model: null,
        condition: 'A - As new',
        description: null,
        contents: null,
        images: [],
        tags: []
      },
      {
        id: testToolIds[1],
        title: "t2",
        catalogCode: 2,
        brand: 'b2',
        model: null,
        condition: 'A - As new',
        description: null,
        contents: null,
        images: [],
        tags: []
      },
      {
        id: testToolIds[2],
        title: "t3",
        catalogCode: 3,
        brand: 'b3',
        model: null,
        condition: 'A - As new',
        description: null,
        contents: null,
        images: [],
        tags: []
      },
      {
        id: testToolIds[3],
        title: "t4",
        catalogCode: 4,
        brand: 'b4',
        model: null,
        condition: 'A - As new',
        description: null,
        contents: null,
        images: [],
        tags: []
      },
    ]);
  });

  test("works: by title", async function () {
    let tools = await Tool.findAll({ title: 't1' });
    expect(tools).toEqual([
        {
            id: testToolIds[0],
            title: "t1",
            catalogCode: 1,
            brand: 'b1',
            model: null,
            condition: 'A - As new',
            description: null,
            contents: null,
            images: [],
            tags: []
        },
    ]);
  });
});

/************************************** get */

describe("get", function () {
  test("works", async function () {
    let tool = await Tool.get(testToolIds[0]);
    expect(tool).toEqual({
        id: testToolIds[0],
        title: "t1",
        catalogCode: 1,
        brand: 'b1',
        model: null,
        condition: 'A - As new',
        description: null,
        contents: null,
        images: [],
        tags: []
    });
  });

  test("not found if no such tool", async function () {
    try {
      await Tool.get(0);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
