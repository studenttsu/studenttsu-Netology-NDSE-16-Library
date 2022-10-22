const { Router } = require('express');
const usersController = require('../controllers/usersController');

const usersRoutes = Router();

usersRoutes
    .post('/login', usersController.login);

exports.usersRoutes = usersRoutes;