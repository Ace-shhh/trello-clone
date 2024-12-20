const express = require('express');
const routes = express.Router();
const commentController = require('../controller/commentController');
routes.post('/create', commentController.create)
module.exports = routes;