// data-source.ts
import { DataSource } from "typeorm";
import { girokontoEntity } from "../entity/girokontoEntity";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "JJRohwer",
    password: "2004",
    database: "finanztool",
    synchronize: true, // Set to false in production
    logging: false,
    entities: [girokontoEntity],
    migrations: [],
    subscribers: [],
});
