const db = require('../config/db');

const Review = {
  create: (userId, workId, title, content, rating, callback) => {
    const sql = 'INSERT INTO reviews (user_id, work_id, title, content, rating) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [userId, workId, title, content, rating], callback);
  },

  getByWorkId: (workId, callback) => {
    const sql = `
      SELECT r.*, u.username 
      FROM reviews r 
      JOIN users u ON r.user_id = u.id 
      WHERE r.work_id = ?
    `;
    db.query(sql, [workId], callback);
  }
};

module.exports = Review;
