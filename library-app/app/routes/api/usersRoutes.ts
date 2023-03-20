import { Router } from "express";
import * as usersController from '../../controllers/usersController';

export const usersRoutes = Router();

usersRoutes
    .post('/login', usersController.login);