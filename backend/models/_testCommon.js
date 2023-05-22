const bcrypt = require("bcrypt");

const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config");

const testToolIds = [];
const testUserIds = [];
const testResIds = [];

async function commonBeforeAll() {
    // noinspection SqlWithoutWhere
    await db.query("DELETE FROM tools");
    await db.query("DELETE FROM users");
    await db.query("DELETE FROM reservations")

    const resultsTools = await db.query(`
        INSERT INTO tools (title, catalog_code, brand, model, condition, description, contents)
        VALUES 	('t1', 1,'b1',NULL,'A - As new',NULL,NULL),
                ('t2', 2,'b2',NULL,'A - As new',NULL,NULL),
                ('t3', 3,'b3',NULL,'A - As new',NULL,NULL),
                ('t4', 4,'b4',NULL,'A - As new',NULL,NULL)
        RETURNING id`);
    testToolIds.splice(0, 0, ...resultsTools.rows.map(r => r.id));

    const resultsUsers = await db.query(`
        INSERT INTO users (username, password, first_name, last_name, email)
        VALUES  ('u1', $1, 'U1F', 'U1L', 'u1@email.com'),
                ('u2', $2, 'U2F', 'U2L', 'u2@email.com')
        RETURNING id`,
        [
            await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
            await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
        ]);
    testUserIds.splice(0, 0, ...resultsUsers.rows.map(r => r.id));

    const resultsRes = await db.query(`
        INSERT INTO reservations (user_id, tool_id, is_active, start_date, due_date)
        VALUES  ($1, $2, true, '2023-05-22', '2023-05-23'),
                ($3, $4, true, '2023-06-01', '2023-06-02')
        RETURNING id`,
        [testUserIds[0], testToolIds[0], testUserIds[1], testToolIds[1]]);
    testResIds.splice(0, 0, ...resultsRes.rows.map(r => r.id));
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


module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testToolIds,
  testUserIds,
  testResIds
};