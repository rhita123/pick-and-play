const express = require('express');
const router = express.Router();
const restaurantRepo = require('../utils/restaurant.repository');

router.get('/categories', categoryListAction);
router.get('/list', restaurantListAction);
router.get('/show/:RestaurantId', restaurantShowAction);
router.get('/del/:RestaurantId', restaurantDelAction);
router.post('/update/:RestaurantId', restaurantUpdateAction);

// http://localhost:9000/restaurantapi/categories
async function categoryListAction(request, response) {
    var categories = await restaurantRepo.getAllCategories();
    response.send(JSON.stringify(categories));
}

async function restaurantListAction(request, response) {
    var restaurants = await restaurantRepo.getAllRestaurants();
    response.send(JSON.stringify(restaurants));
}

async function restaurantShowAction(request, response) {
    var oneRestaurant = await restaurantRepo.getOneRestaurant(request.params.RestaurantId);
    response.send(JSON.stringify(oneRestaurant));
}

async function restaurantDelAction(request, response) {
    var numRows = await restaurantRepo.delOneRestaurant(request.params.RestaurantId);
    let result = { rowsDeleted: numRows };
    response.send(JSON.stringify(result));
}

async function restaurantUpdateAction(request, response) {
    var RestaurantId = request.params.RestaurantId;
    if (RestaurantId === "0") {
        restaurantId = await restaurantRepo.addOneRestaurant(
            request.body.name,
            request.body.category,
            request.body.rating,
            request.body.location,
            request.body.average_price
        );
    }
    var numRows = await restaurantRepo.editOneRestaurant(
        RestaurantId,
        request.body.name,
        request.body.category,
        request.body.rating,
        request.body.location,
        request.body.average_price
    );
    let result = { rowsUpdated: numRows };
    response.send(JSON.stringify(result));
}

module.exports = router;