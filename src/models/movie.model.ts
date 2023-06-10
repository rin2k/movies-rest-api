import { DataTypes } from "sequelize";
import { connection } from "../config";
import { Movie } from "../interfaces";
import { TABLE_NAME } from "../utils";

const MovieModel = connection.define<Movie>(TABLE_NAME.MOVIES, {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false,
    get() {
      const value: any = this.getDataValue("genre");
      return value ? JSON.parse(value) : [];
    },
    set(value: string[]) {
      this.setDataValue("genre", JSON.stringify(value) as any);
    },
  },
  director: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  releaseYear: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  poster: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  actors: {
    type: DataTypes.STRING,
    allowNull: false,
    get() {
      const value: any = this.getDataValue("actors");
      return value ? JSON.parse(value) : [];
    },
    set(value: string[]) {
      this.setDataValue("actors", JSON.stringify(value) as any);
    },
  },
  videoURL: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default MovieModel;
