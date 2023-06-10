import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

export interface Movie
  extends Model<InferAttributes<Movie>, InferCreationAttributes<Movie>> {
  id: CreationOptional<number>;
  title: string;
  description: string;
  genre: Array<string | undefined>;
  director: string;
  releaseYear: string;
  duration: number;
  poster: string;
  country: string;
  actors: Array<string | undefined>;
  videoURL: string;
  createdAt?: Date;
  updatedAt?: Date;
  rating?: number;
}
