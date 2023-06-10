import { RequestHandler } from "express";

import { Schema, ValidationError } from "yup";

const validateRequestSchema =
  (schema: Schema): RequestHandler<unknown> =>
  async (req, res, next) => {
    try {
      await schema.validate(req);
      next();
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(200).json({
          code: 400,
          status: "Error",
          message: error.message,
        });
      } else {
        next(error);
      }
    }
  };

export default validateRequestSchema;
