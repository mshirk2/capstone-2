\echo 'Delete and recreate tool_library db?'
\prompt 'Return for yes or control_C to cancel > ' foo

DROP DATABASE IF EXISTS tool_library;
CREATE DATABASE tool_library;
\connect tool_library

\i tool_library_schema.sql
\i tool_library_seed.sql

\echo 'Delete and recreate tool_library_test db?'
\prompt 'Return for yes or control_C to cancel > ' foo

DROP DATABASE IF EXISTS tool_library_test;
CREATE DATABASE tool_library_test;
\connect tool_library_test

\i tool_library_schema.sql
