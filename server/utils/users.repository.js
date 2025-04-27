const pool = require('./db.include.js'); // Ensure the path matches

module.exports = {
  // Get one user by username (excluding password/hash info)
  async getOneUser(userName) {
    try {
      const conn = await pool.getConnection();
      const sql = `
        SELECT 
          user_id, user_name, user_email, user_role 
        FROM users 
        WHERE user_name = ? 
      `;
      const [rows] = await conn.execute(sql, [userName]);
      conn.release(); // Release the connection back to the pool
      if (rows.length === 1) {
        return rows[0];
      } else {
        return false; // No user found
      }
    } catch (err) {
      console.error("Error in getOneUser:", err);
      throw err;
    }
  },

  // Validate user credentials (username and password)
  async areValidCredentials(username, password) {
    try {
      const conn = await pool.getConnection();
      const sql = `
        SELECT * 
        FROM users 
        WHERE user_name = ? 
          AND user_pass = sha2(concat(user_created, ?), 224)
      `;
      const [rows] = await conn.execute(sql, [username, password]);
      conn.release(); // Release the connection back to the pool
      if (rows.length === 1 && rows[0].user_name === username) {
        return true;
      } else {
        return false; // Invalid credentials
      }
    } catch (err) {
      console.error("Error in areValidCredentials:", err);
      throw err;
    }
  },

  // (Optional) Add a method for user registration
  async registerUser(userName, email, password, role = "USER") {
    try {
      const conn = await pool.getConnection();
      const sql = `
        INSERT INTO users (user_name, user_email, user_pass, user_role, user_created) 
        VALUES (?, ?, sha2(concat(now(), ?), 224), ?, now())
      `;
      const [result] = await conn.execute(sql, [userName, email, password, role]);
      conn.release(); // Release the connection back to the pool
      return result.insertId; // Return the new user's ID
    } catch (err) {
      console.error("Error in registerUser:", err);
      throw err;
    }
  },
};
