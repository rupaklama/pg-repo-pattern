const pool = require('../pool');
const toCamelCase = require('./utils/to-camel-case');

// The Repository Pattern is a design pattern used in software development that provides a way to manage data access logic in a Centralized Location. The Repository Pattern is a way to implement data access logic in a Separate Layer.

module.exports = class UserRepo {
  // Static methods are called on the class itself meaning class's methods, not on instances of the class.
  // Static methods are often used to create utility functions to group related functionalities together.
  static async find() {
    const { rows } = await pool.query('SELECT * FROM users');

    return toCamelCase(rows);
  }

  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return toCamelCase(rows)[0];
  }

  static async insert(username, bio) {
    const { rows } = await pool.query('INSERT INTO users (username, bio) VALUES ($1, $2) RETURNING *', [username, bio]);
    return rows[0];
  }

  static async update(id, username, bio) {
    const { rows } = await pool.query('UPDATE users SET username=$1, bio=$2 WHERE id=$3 RETURNING *', [
      username,
      bio,
      id,
    ]);
    return rows[0];
  }

  static async delete(id) {
    const { rows } = await pool.query('DELETE FROM users WHERE id=$1 RETURNING *', [id]);
    return rows[0];
  }
};
