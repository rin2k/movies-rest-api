import { Router } from "express";
import { RatingController } from "../controllers";
import { authenticateToken, validateRequestSchema } from "../middleware";
import {
  createRatingSchema,
  getRatingByMovieSchema,
  updateRatingSchema,
} from "../schema";

const router = Router();

// Get rating by user ID
router.get(
  "/users/ratings",
  authenticateToken,
  RatingController.getRatingByUserId
);

// Get rating by movie ID
router.get(
  "/movies/:movieId/ratings",
  validateRequestSchema(getRatingByMovieSchema),
  RatingController.getRatingByMovie
);

// Create a rating
router.post(
  "/movies/:movieId/ratings",
  authenticateToken,
  validateRequestSchema(createRatingSchema),
  RatingController.createRating
);

// Update a rating
router.put(
  "/ratings/:ratingId",
  authenticateToken,
  validateRequestSchema(updateRatingSchema),
  RatingController.updateRating
);

export default router;
