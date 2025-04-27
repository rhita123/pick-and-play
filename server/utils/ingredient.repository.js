pool = require(__dirname + "/db.include.js");

module.exports = {
    async getAllIngredients() {
        try {
            let sql = "SELECT * FROM ingredients";
            const [rows, fields] = await pool.execute(sql);
            console.log("INGREDIENTS FETCHED: " + rows.length);
            return rows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    async getOneIngredient(IngredientId) {
        try {
            let sql = "SELECT * FROM ingredients WHERE IngredientId = ?";
            const [rows, fields] = await pool.execute(sql, [IngredientId]);
            console.log("SINGLE INGREDIENT FETCHED: " + rows.length);
            if (rows.length == 1) {
                return rows[0];
            } else {
                return false;
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    async delOneIngredient(IngredientId) {
        try {
            let sql = "DELETE FROM ingredients WHERE IngredientId= ?";
            const [okPacket, fields] = await pool.execute(sql, [IngredientId]);
            console.log("DELETE " + JSON.stringify(okPacket));
            return okPacket.affectedRows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    async addOneIngredient(name, quantity) {
        try {
            let sql = "INSERT INTO ingredients (name, quantity) VALUES (?, ?)";
            const [okPacket, fields] = await pool.execute(sql, [name, quantity]);
            console.log("INSERT " + JSON.stringify(okPacket));
            return okPacket.insertId;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    async editOneIngredient(IngredientId, name, quantity) {
        try {
            let sql = "UPDATE ingredients SET name=?, quantity=? WHERE IngredientId=?";
            const [okPacket, fields] = await pool.execute(sql, [name, quantity, IngredientId]);
            console.log("UPDATE " + JSON.stringify(okPacket));
            return okPacket.affectedRows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
};
