import { Router } from "express";
import GenreController from "../controllers/genre.controller";

const router = Router();

router.get("/genres", GenreController.getGenres);

export default router;
