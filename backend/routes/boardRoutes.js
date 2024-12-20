const express = require('express');
const routes = express.Router();
const boardController = require('../controller/boardController');

routes.get('/:id', boardController.getBoardById);
routes.post('/create', boardController.createBoard);
routes.patch('/addBoardColumn/:id', boardController.addBoardColumn);
routes.patch('/updateBoardColumnsOrder/:id', boardController.updateBoardColumnsOrder);
module.exports = routes;