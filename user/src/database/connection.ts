import { Sequelize } from "sequelize-typescript";
import UserModel,{roleEnums} from "./models/user_model";
import { ValidationError } from "../utils/error_handling/app_error";

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

  UserModel.beforeCreate((user,create)=>{
    if(!roleEnums.includes(user.role)){
      throw new ValidationError(`${user.role} not accpeted as role`);
    }
  })
}


