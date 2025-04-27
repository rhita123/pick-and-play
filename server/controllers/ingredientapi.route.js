const express = require('express');
const router = express.Router();
const ingredientRepo = require('../utils/ingredient.repository');

router.get('/list', ingredientListAction);
router.get('/show/:IngredientId', ingredientShowAction);
router.get('/del/:IngredientId', ingredientDelAction);
router.post('/update/:IngredientId', ingredientUpdateAction);

async function ingredientListAction(request, response) {
    var ingredients = await ingredientRepo.getAllIngredients();
    response.send(JSON.stringify(ingredients));
}
async function ingredientShowAction(request, response) {
    var oneIngredient = await ingredientRepo.getOneIngredient(request.params.IngredientId);
    response.send(JSON.stringify(oneIngredient));
}
async function ingredientDelAction(request, response) {
    var numRows = await ingredientRepo.delOneIngredient(request.params.IngredientId);
    let result = { rowsDeleted: numRows };
    response.send(JSON.stringify(result));
}
async function ingredientUpdateAction(request, response) {
    var IngredientId = request.params.ingredientId;
    if (IngredientId === "0") IngredientId = await ingredientRepo.addOneIngredient(
        request.body.name, 
        request.body.quantity
    );
    var numRows = await ingredientRepo.editOneIngredient(
        IngredientId, 
        request.body.name, 
        request.body.quantity
    );
    let result = { rowsUpdated: numRows };
    response.send(JSON.stringify(result));
}

module.exports = router;
