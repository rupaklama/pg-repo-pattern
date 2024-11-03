const pg = require('pg');

// This class will be use to connect multiple databases & easier setup for testing purposes
class Pool {
  _pool = null;

  connect(options) {
    this._pool = new pg.Pool(options);
    // activate connection pool with some test query using one of the pool client
    return this._pool.query('SELECT 1+1');
  }

  // to close connection
  close() {
    return this._pool.end();
  }

  // to make query to database
  query(sql, params) {
    return this._pool.query(sql, params);
  }
}

module.exports = new Pool();
