import { Sequelize } from "sequelize-typescript";
import UserModel from "./models/user";

export default async () => {
  const sequelize: Sequelize = new Sequelize({
    dialect: "postgres",
    host: "localhost",
    username: "abhishek",
    password: "12345",
    database: "postgres",
    logging: false,
    models: [UserModel]
  });
  await sequelize.sync();
}

