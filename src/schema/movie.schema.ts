import * as yup from "yup";

export const createMovieSchema = yup.object({
  body: yup.object({
    title: yup.string().required(),
    description: yup.string().required(),
    genre: yup
      .mixed()
      .test((value) => {
        if (Array.isArray(value)) {
          return yup.array().of(yup.string()).isValidSync(value);
        } else if (typeof value === "number") {
          return yup.number().isValidSync(value);
        } else if (typeof value === "string") {
          return yup.string().isValidSync(value);
        }
        return false;
      })
      .required(),
    director: yup.string().required(),
    releaseYear: yup.string().required("Release year is required"),
    duration: yup.number().integer().required(),
    posterHorizontal: yup.string().required(),
    posterVertical: yup.string().required(),
    country: yup.string().required(),
    actors: yup.string().required(),
    videoURL: yup
      .mixed()
      .test((value) => {
        if (Array.isArray(value)) {
          return yup.array().of(yup.string()).isValidSync(value);
        } else if (typeof value === "number") {
          return yup.number().isValidSync(value);
        } else if (typeof value === "string") {
          return yup.string().isValidSync(value);
        }
        return false;
      })
      .required(),
    trailerURL: yup
      .string()
      .url("Link trailer không hợp lệ")
      .required("Trailer URL is required"),
  }),
});

export type CreateMovieBody = yup.InferType<
  Required<typeof createMovieSchema>
>["body"];
