pool = require(__dirname + "/db.include.js");

module.exports = {
    getBlankCocktail() {
        return {
            "CocktailID": 0,
            "Name": "XXXX",
            "Category": "XXXX",
            "PreparationTime": 0,
            "Difficulty": "XXXX",
            "Origin": "XXXX"
        };
    },
    async getAllCocktails() {
        try {
            let sql = "SELECT * FROM COCKTAILS";
            const [rows, fields] = await pool.execute(sql);
            console.log("COCKTAILS FETCHED: " + rows.length);
            return rows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    async getAllCategories() {
        try {
            let sql = "SELECT DISTINCT Category FROM COCKTAILS";
            const [rows, fields] = await pool.execute(sql);
            console.log("CATEGORIES FETCHED: " + rows.length);
            return rows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    async getOneCocktail(CocktailId) {
        try {
          let sql = "SELECT * FROM cocktails WHERE CocktailID = ?";
          const [rows, fields] = await pool.execute(sql, [CocktailId]);
          if (rows.length === 1) {
            return rows[0];
          } else {
            return false; // Returns false if no match is found
          }
        } catch (err) {
          console.error(err);
          throw err;
        }
      },
      
    async delOneCocktail(CocktailID) {
        try {
            let sql = "DELETE FROM COCKTAILS WHERE CocktailID = ?";
            const [okPacket, fields] = await pool.execute(sql, [CocktailID]);
            console.log("DELETE " + JSON.stringify(okPacket));
            return okPacket.affectedRows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    async addOneCocktail(Name, Category, PreparationTime, Difficulty, Origin) {
        try {
          let sql = "INSERT INTO COCKTAILS (Name, Category, PreparationTime, Difficulty, Origin) VALUES (?, ?, ?, ?, ?)";
          const [okPacket] = await pool.execute(sql, [Name, Category, PreparationTime, Difficulty, Origin]);
          console.log("INSERT " + JSON.stringify(okPacket));
          return okPacket.insertId; // Return the ID of the newly added cocktail
        } catch (err) {
          console.error(err);
          throw err;
        }
      },
      
    async editOneCocktail(CocktailID, Name, Category, PreparationTime, Difficulty, Origin) {
        try {
            let sql = "UPDATE COCKTAILS SET Name=?, Category=?, PreparationTime=?, Difficulty=?, Origin=? WHERE CocktailID=?";
            const [okPacket, fields] = await pool.execute(sql, [Name, Category, PreparationTime, Difficulty, Origin, CocktailID]);
            console.log("UPDATE " + JSON.stringify(okPacket));
            return okPacket.affectedRows;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
};
