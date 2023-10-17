import { Sequelize } from "sequelize-typescript";
import { ClinicModel } from ".";
import { AlreadyExistError } from "../../../utils/error_handling/app_error";

export default async()=>{
    const sequelize=new Sequelize({
        dialect: "postgres",
        host: "localhost",
        username: "abhishek",
        password: "12345",
        database: "postgres",
        logging: false,
        models: [ClinicModel]
    })
    await sequelize.sync();
    ClinicModel.beforeCreate(async (user,_)=>{
        const data=await ClinicModel.findOne({where:{name:user.name}})
        if(data){
            throw new AlreadyExistError(`Clinic already exist with ${user.name} name,please try with other name`);
        }
    })
}