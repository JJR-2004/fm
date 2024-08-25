// data-source.ts
import { DataSource } from "typeorm";
import { girokonto as girokontoEntity } from "../entity/girokontoEntity";
import { zahlungsempfaenger as zahlumgsempfaengerEntity } from "../entity/zahlungsempfaengerEntity";
import { Kategorie as kategorieEntitiy } from "../entity/kategorieEntitiy";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "JJRohwer",
    password: "2004",
    database: "finanztool",
    synchronize: true, // Set to false in production
    logging: false,
    entities: [girokontoEntity, zahlumgsempfaengerEntity, kategorieEntitiy],
    migrations: [],
    subscribers: [],
});

await AppDataSource.initialize()
    .then(async () => {
        console.log("Erfolgreich mit der Datenbank verbunden.");
    })
    .catch((error) => {
        console.error("Probleme bei der Verbindung mit der Datenbank: ", error);
    });
