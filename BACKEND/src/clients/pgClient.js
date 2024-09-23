const { Pool } = require('pg');
const config = require('../../config/config');

const pool = new Pool({
  database: config.DATABASE,
  host: config.PG_HOST,
  port: config.PG_PORT,
  user: config.PG_USERNAME,
  password: config.PG_PASSWORD,
});

module.exports.query = async (query, values = []) => {
  let conn;
  try {
    conn = await pool.connect();
    let response = await conn.query(query, values);
    return response;
  } catch (er) {
    if (er.code == 'ECONNREFUSED') throw new Error('NETWORK_ERROR');
    throw er;
  } finally {
    if (conn) conn.release();
  }
};
