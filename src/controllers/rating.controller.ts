import { RequestHandler } from "express";
import { Favorite, Rating, ResponseResult } from "../interfaces";
import { MovieModel, RatingModel } from "../models";
import {
  CreateCommentBody,
  CreateRatingBody,
  CreateRatingParams,
  GetCommentsByMovieParams,
  UpdateRatingBody,
  UpdateRatingParams,
} from "../schema";
import { ErrorCode, sendResponse } from "../utils";

const getRatingByMovie: RequestHandler<
  GetCommentsByMovieParams,
  ResponseResult<Array<Favorite> | undefined>,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const { movieId } = req.params;

    const movie = await MovieModel.findByPk(movieId);
    if (!movie) {
      return sendResponse(res, ErrorCode["movie-not-found"]);
    }

    const ratings = await RatingModel.findAll({
      where: {
        movieId,
      },
    });

    return sendResponse(res, {
      code: 200,
      status: "Success",
      data: ratings,
    });
  } catch (error) {
    next(error);
  }
};

const getRatingByUserId: RequestHandler<
  unknown,
  ResponseResult<Array<Favorite> | undefined>,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const ratings = await RatingModel.findAll({
      where: {
        userId: req.user.id,
      },
    });
    return sendResponse(res, {
      code: 200,
      status: "Success",
      data: ratings,
    });
  } catch (error) {
    next(error);
  }
};

const createRating: RequestHandler<
  CreateRatingParams,
  ResponseResult<Rating | undefined>,
  CreateRatingBody,
  unknown
> = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const { rating } = req.body;
    const userId = req.user.id;

    const movie = await MovieModel.findByPk(movieId);
    if (!movie) {
      return sendResponse(res, ErrorCode["movie-not-found"]);
    }

    const ratingRecord = await RatingModel.sync({ alter: true }).then(() => {
      return RatingModel.create({
        movieId,
        userId,
        rating,
      });
    });

    sendResponse(res, {
      code: 201,
      status: "Success",
      data: ratingRecord,
    });
  } catch (error) {
    next(error);
  }
};

const updateRating: RequestHandler<
  UpdateRatingParams,
  ResponseResult<undefined>,
  UpdateRatingBody,
  unknown
> = async (req, res, next) => {
  try {
    const { ratingId } = req.params;
    const { rating } = req.body;

    const ratingFound = await RatingModel.findByPk(ratingId);
    if (!ratingFound) {
      return sendResponse(res, ErrorCode["favorite-not-found"]);
    }
    ratingFound.update({
      rating,
    });

    return sendResponse(res, {
      code: 200,
      status: "Success",
      message: "Cập nhật đánh giá thành công.",
    });
  } catch (error) {
    next(error);
  }
};

const RatingController = {
  getRatingByMovie,
  getRatingByUserId,
  createRating,
  updateRating,
};

export default RatingController;
