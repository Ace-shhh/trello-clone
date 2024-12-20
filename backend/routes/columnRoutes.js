const express = require('express');
const routes = express.Router();
const columnController = require('../controller/columnController')

routes.post('/create', columnController.addColumn);
routes.get('/', columnController.getColumns);
routes.patch('/updateCardsOrder/:id', columnController.updateCardsOrder);
routes.patch('/addCard/:id', columnController.addCardtoColumn);
routes.patch('/updateColumn/:id', columnController.updateColumn);
module.exports = routes;