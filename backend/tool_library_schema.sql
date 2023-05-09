CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(25) NOT NULL,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE tools (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  catalog_code INTEGER NOT NULL,
  brand TEXT,
  model TEXT,
  condition TEXT NOT NULL,
  description TEXT,
  contents TEXT,
  available BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE reservations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER
    REFERENCES users ON DELETE CASCADE,
  tool_id INTEGER
    REFERENCES tools ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL
);

CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  name VARCHAR(25) NOT NULL
);

CREATE TABLE tools_tags (
  id SERIAL PRIMARY KEY,
  tool_id INTEGER
    REFERENCES tools ON DELETE CASCADE,
  tag_id INTEGER
    REFERENCES tags ON DELETE CASCADE
);

CREATE TABLE images (
  id SERIAL PRIMARY KEY,
  url TEXT NOT NULL
);

CREATE TABLE tools_images (
  id SERIAL PRIMARY KEY,
  tool_id INTEGER
    REFERENCES tools ON DELETE CASCADE,
  image_id INTEGER
    REFERENCES images ON DELETE CASCADE
);