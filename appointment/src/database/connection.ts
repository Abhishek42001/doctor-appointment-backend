import { Sequelize } from "sequelize-typescript";

export default async() => {
    const sequelize = new Sequelize({
        database: 'postgres',
        dialect: 'postgres',
        username: 'abhishek',
        password: '12345',
    })
    await sequelize.sync();
}