import * as yup from "yup";

export const createMovieSchema = yup.object({
  body: yup.object({
    title: yup.string().required(),
    description: yup.string().required(),
    genre: yup.array().of(yup.string()).required(),
    director: yup.string().required(),
    releaseYear: yup.string().required(),
    duration: yup.number().integer().required(),
    poster: yup.string().required(),
    country: yup.string().required(),
    actors: yup.array().of(yup.string()).required(),
    videoURL: yup.string().required(),
  }),
});

export type CreateMovieBody = yup.InferType<
  Required<typeof createMovieSchema>
>["body"];
