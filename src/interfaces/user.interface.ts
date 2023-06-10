import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

export interface User
  extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  id: CreationOptional<number>;
  name: string;
  email: string;
  birthday: Date;
  createdAt?: Date;
  updatedAt?: Date;
  password?: string;
  photoURL?: string;
  isAdmin?: boolean;
}
