const express = require('express');
const routes = express.Router();
const workspaceController = require('../controller/workspaceController');

routes.post('/create', workspaceController.createWorkspace);
routes.get('/get/:id', workspaceController.getWorkspaces);
routes.patch('/update/:id', workspaceController.updateWorkspace);
module.exports = routes;