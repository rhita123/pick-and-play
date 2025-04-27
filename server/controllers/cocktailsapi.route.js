// controllers/cocktailsapi.route.js
const express = require('express');
const router = express.Router();
const cocktailRepo = require('../utils/cocktails.repository');

router.get('/categories', categoryListAction);
router.get('/list', cocktailListAction);
router.get('/show/:CocktailId', cocktailShowAction);
router.delete('/del/:CocktailId', cocktailDelAction);
router.post('/update/:CocktailId', cocktailUpdateAction);
router.post('/add', cocktailAddAction);

// http://localhost:9000/cocktailsapi/categories
async function categoryListAction(request, response) {
    var categories = await cocktailRepo.getAllCategories();
    response.send(JSON.stringify(categories));
}

async function cocktailListAction(request, response) {
    var cocktails = await cocktailRepo.getAllCocktails();
    response.send(JSON.stringify(cocktails));
}
async function cocktailShowAction(request, response) {
    var oneCocktail = await cocktailRepo.getOneCocktail(request.params.CocktailId);
    response.send(JSON.stringify(oneCocktail));
}
async function cocktailDelAction(request, response) {
    try {
        const CocktailId = request.params.CocktailId;
        const numRows = await cocktailRepo.delOneCocktail(CocktailId); // Call repository function
        if (numRows > 0) {
            response.status(200).send({ success: true, message: "Cocktail deleted successfully." });
        } else {
            response.status(404).send({ success: false, message: "Cocktail not found." });
        }
    } catch (error) {
        console.error(error);
        response.status(500).send({ success: false, message: "Error deleting cocktail." });
    }
}
async function cocktailAddAction(request, response) {
    try {
      const { name, category, preparation_time, difficulty, origin } = request.body;
      const CocktailId = await cocktailRepo.addOneCocktail(name, category, preparation_time, difficulty, origin);
      response.status(201).send({ success: true, CocktailId });
    } catch (error) {
      console.error(error);
      response.status(500).send({ success: false, message: "Error adding cocktail." });
    }
  }
async function cocktailUpdateAction(request, response) {
    // TODO: !!! INPUT VALIDATION !!!
    var CocktailId = request.params.CocktailId;
    if (CocktailId === "0") CocktailId = await cocktailRepo.addOneCocktail(
        request.body.name, 
        request.body.category, 
        request.body.preparation_time, 
        request.body.difficulty, 
        request.body.origin
    );
    var numRows = await cocktailRepo.editOneCocktail(
        CocktailId, 
        request.body.name, 
        request.body.category, 
        request.body.preparation_time, 
        request.body.difficulty, 
        request.body.origin
    );
    let result = { rowsUpdated: numRows };
    response.send(JSON.stringify(result));
}

module.exports = router;
