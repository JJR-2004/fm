// index.ts
import "reflect-metadata";
import { AppDataSource } from "./data-source";

await AppDataSource.initialize()
    .then(async () => {
        console.log("Erfolgreich mit der Datenbank verbunden.");
    })
    .catch((error) => {
        console.error("Probleme bei der Verbindung mit der Datenbank: ", error);
    });
