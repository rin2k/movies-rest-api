import { Router } from "express";
import { MovieController } from "../controllers";
import { authenticateToken, validateRequestSchema } from "../middleware";
import { createMovieSchema } from "../schema";

const router = Router();

router.get("/movies/search", MovieController.searchMovie);

router.post(
  "/movies",
  authenticateToken,
  validateRequestSchema(createMovieSchema),
  MovieController.createMovie
);

router.put("/movies/:id", MovieController.updateMovie);

router.delete("/movies/:id", MovieController.deleteMovie);

router.get("/movies/:id", MovieController.getMovieById);

export default router;
