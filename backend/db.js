const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres', // default PostgreSQL user
  host: 'localhost',
  database: 'auto_face_sid_db',
  password: '@Seena123', // change this to your actual password
  port: 5432,
});

module.exports = pool;