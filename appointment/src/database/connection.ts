import { Sequelize } from "sequelize-typescript";
import { AppointmentModel } from ".";

export default async() => {
    const sequelize = new Sequelize({
        database: 'postgres',
        dialect: 'postgres',
        username: 'abhishek',
        password: '12345',
        logging:false,
        models:[AppointmentModel]
    })
    await sequelize.sync();
}