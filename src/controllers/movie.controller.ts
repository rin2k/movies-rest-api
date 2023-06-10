import { Request, RequestHandler, Response } from "express";
import { Op } from "sequelize";
import unidecode from "unidecode";
import { Movie, ResponseResult } from "../interfaces";
import { MovieModel } from "../models";
import { CreateMovieBody } from "../schema";
import { sendResponse } from "../utils";

const createMovie: RequestHandler<
  unknown,
  ResponseResult<Movie | undefined>,
  CreateMovieBody,
  unknown
> = (req, res, next) => {
  try {
    const {
      title,
      description,
      genre,
      director,
      releaseYear,
      duration,
      poster,
      country,
      actors,
      videoURL,
    } = req.body;

    MovieModel.sync({ alter: true }).then(() => {
      return MovieModel.create({
        title,
        description,
        genre,
        director,
        releaseYear,
        duration,
        poster,
        country,
        actors,
        videoURL,
      });
    });

    return sendResponse(res, {
      code: 200,
      status: "Success",
      message: "Thêm phim thành công.",
    });
  } catch (error) {}
};

const updateMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const movie = await MovieModel.findByPk(id);

    if (!movie) {
      return sendResponse(res, {
        code: 404,
        status: "Error",
        message: "Không tìm thấy phim.",
      });
    }

    const updateMovie = {};

    movie.update({ ...updateMovie });

    return sendResponse(res, {
      code: 200,
      status: "Success",
      data: movie,
    });
  } catch (error) {}
};

const deleteMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const movie = await MovieModel.findByPk(id);

    if (!movie) {
      return sendResponse(res, {
        code: 400,
        status: "Error",
        message: "Không tìm thấy phim.",
      });
    }
    movie.destroy();

    return sendResponse(res, {
      code: 200,
      status: "Success",
      message: "Xoá phim thành công.",
    });
  } catch (error) {}
};

const getMovieById = async (
  req: Request,
  res: Response<ResponseResult<Movie | null>>,
  next: any
) => {
  try {
    const { id } = req.params;

    const movie = await MovieModel.findByPk(id);
    if (!movie) {
      return sendResponse(res, {
        code: 400,
        status: "Error",
        message: "Không tìm thấy phim.",
      });
    }
    return sendResponse(res, {
      code: 200,
      status: "Success",
      data: movie,
    });
  } catch (error) {}
};

const searchMovie = async (req: Request, res: Response) => {
  try {
    const { query } = req.body;

    const normalizedSearchQuery = unidecode(query);

    const movies = await MovieModel.findAll({
      where: {
        title: {
          [Op.like]: `%${normalizedSearchQuery.trim()}%`,
        },
      },
    });

    return sendResponse(res, {
      code: 200,
      status: "Success",
      data: movies,
    });
  } catch (error) {
    console.log(error);
  }
};

const MovieController = {
  createMovie,
  updateMovie,
  deleteMovie,
  getMovieById,
  searchMovie,
};

export default MovieController;
