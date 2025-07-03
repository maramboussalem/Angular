// models/userModel.js
const db = require('../db');

const createUser = (name, email, password, role, callback) => {
  const sql = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`;
  db.run(sql, [name, email, password, role], callback);
};

const findUserByEmail = (email, callback) => {
  const sql = `SELECT * FROM users WHERE email = ?`;
  db.get(sql, [email], callback);
};

const updateUser = (id, name, email, callback) => {
  const sql = `UPDATE users SET name = ?, email = ? WHERE id = ?`;
  db.run(sql, [name, email, id], callback);
};

const deleteUser = (id, callback) => {
  const sql = `DELETE FROM users WHERE id = ?`;
  db.run(sql, [id], callback);
};

module.exports = {
  createUser,
  findUserByEmail,
  updateUser,
  deleteUser
};
