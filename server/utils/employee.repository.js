pool = require(__dirname + "/db.include.js");

module.exports = {
    async getAllEmployees() {
        try {
            let sql = "SELECT * FROM employees";
            const [rows, fields] = await pool.execute(sql);
            console.log("EMPLOYEES FETCHED: " + rows.length);
            return rows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    async getOneEmployee(EmployeesID) {
        try {
          if (!EmployeesID || EmployeesID === "undefined") {
            throw new Error("Invalid Employee ID.");
          }
          let sql = "SELECT * FROM employees WHERE EmployeesID = ?";
          const [rows, fields] = await pool.execute(sql, [EmployeesID]);
          if (rows.length === 1) {
            return rows[0];
          } else {
            return false;
          }
        } catch (err) {
          console.error(err);
          throw err;
        }
      },
      
    async delOneEmployee(EmployeesID) {
        try {
            let sql = "DELETE FROM employees WHERE EmployeesID = ?";
            const [okPacket, fields] = await pool.execute(sql, [EmployeesID]);
            console.log("DELETE " + JSON.stringify(okPacket));
            return okPacket.affectedRows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    async addOneEmployee(name, email, password) {
        try {
            let sql = "INSERT INTO employees (name, email, password) VALUES (?, ?, ?)";
            const [okPacket, fields] = await pool.execute(sql, [name, email, password]);
            console.log("INSERT " + JSON.stringify(okPacket));
            return okPacket.insertId;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    async editOneEmployee(EmployeesID, name, email, password) {
        try {
            let sql = "UPDATE users SET name=?, email=?, password=? WHERE EmployeesID=?";
            const [okPacket, fields] = await pool.execute(sql, [name, email, password, EmployeesID]);
            console.log("UPDATE " + JSON.stringify(okPacket));
            return okPacket.affectedRows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
};
