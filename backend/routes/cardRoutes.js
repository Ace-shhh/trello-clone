const express = require('express')
const cardController = require('../controller/cardController')

const routes = express.Router();

routes.post('/', cardController.createCard);
routes.get('/:id', cardController.fetchCard);
routes.patch('/:id', cardController.updateCard);
routes.patch('/addComment/:id', cardController.addComment);
module.exports = routes;