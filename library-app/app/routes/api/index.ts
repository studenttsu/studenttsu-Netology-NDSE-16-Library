import { Router } from "express";
import { booksRoutes } from "./booksRoutes";
import { usersRoutes } from "./usersRoutes";

const router = Router();

router.use('/books', booksRoutes);
router.use('/user', usersRoutes);

export default router;