const { Router } = require('express');
const usersController = require('../../controllers/usersController');

export const usersRoutes = Router();

usersRoutes
    .post('/login', usersController.login);