const db = require('../config/db');

const Work = {
  getAll: (callback) => {
    const sql = 'SELECT * FROM works';
    db.query(sql, callback);
  },

  getById: (id, callback) => {
    const sql = 'SELECT * FROM works WHERE id = ?';
    db.query(sql, [id], callback);
  }
};

module.exports = Work;
