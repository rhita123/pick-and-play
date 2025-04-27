pool = require(__dirname + "/db.include.js");

module.exports = {
    getBlankRestaurant() {
        return {
            "RestaurantId": 0,
            "name": "XXXX",
            "category": "XXXX",
            "rating": 0.0,
            "location": "XXXX",
            "average_price": 0.0
        };
    },
    async getAllCategories() {
        try {
            let sql = "SELECT DISTINCT category FROM restaurants";
            const [rows, fields] = await pool.execute(sql);
            console.log("CATEGORIES FETCHED: " + rows.length);
            return rows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    async getAllRestaurants() {
        try {
            let sql = "SELECT * FROM restaurants";
            const [rows, fields] = await pool.execute(sql);
            console.log("RESTAURANTS FETCHED: " + rows.length);
            return rows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    async getRestaurantsByName(name) {
        try {
            let sql = "SELECT * FROM restaurants WHERE upper(name) LIKE upper(?)";
            const [rows, fields] = await pool.execute(sql, [`%${name}%`]);
            console.log("RESTAURANTS FILTERED: " + rows.length);
            return rows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    async getOneRestaurant(RestaurantId) {
        try {
            let sql = "SELECT * FROM restaurants WHERE RestaurantId = ?";
            const [rows, fields] = await pool.execute(sql, [RestaurantId]);
            console.log("SINGLE RESTAURANT FETCHED: " + rows.length);
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
    async delOneRestaurant(RestaurantId) {
        try {
            let sql = "DELETE FROM restaurants WHERE RestaurantId = ?";
            const [okPacket, fields] = await pool.execute(sql, [RestaurantId]);
            console.log("DELETE " + JSON.stringify(okPacket));
            return okPacket.affectedRows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    async addOneRestaurant(name, category, rating, location, average_price) {
        try {
            let sql = "INSERT INTO restaurants (name, category, rating, location, average_price) VALUES (?, ?, ?, ?, ?)";
            const [okPacket, fields] = await pool.execute(sql, [name, category, rating, location, average_price]);
            console.log("INSERT " + JSON.stringify(okPacket));
            return okPacket.insertId;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    async editOneRestaurant(RestaurantId, name, category, rating, location, average_price) {
        try {
            let sql = "UPDATE restaurants SET name=?, category=?, rating=?, location=?, average_price=? WHERE RestaurantId=?";
            const [okPacket, fields] = await pool.execute(sql, [name, category, rating, location, average_price, RestaurantId]);
            console.log("UPDATE " + JSON.stringify(okPacket));
            return okPacket.affectedRows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
};