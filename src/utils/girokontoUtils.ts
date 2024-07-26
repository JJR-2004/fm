import { resolve } from "path";
// import { executeQuery } from "../database/dbConnector";
import { Request, Response, NextFunction } from "express";
import { Transaction } from "../categories/transaction";
import { zahlungsempfaengerEntry } from "../categories/zahlungsempfaengerEntry";
import config from "../index";
import * as zahlungsempfänger from "./zahlungsempfaenger";
import { AppDataSource } from "../database/data-source";
import * as girokontoRepo from "../repositories/girokontoRepo";
import { girokontoEntity } from "../entity/girokontoEntity";

const csvData = config.csvData;

async function check(element: Transaction) {
    // let result = await executeQuery(checkEntryQuery, [
    //     config.convertDateFormat(element.Buchungstag.toString()),
    //     config.converteBetragFormat(element.Betrag),
    //     element["IBAN Zahlungsbeteiligter"],
    // ]);
    // return result;
}

export async function get() {
    try {
        let result = girokontoRepo.get();
        console.log("Girokonot Einträge", result);
        return result;
    } catch (error) {
        console.error("Fehler beim Abrufen der Girokonto Einträge: ", error);
    }
}

async function insert(element: Transaction) {
    try {
        let zahlungsempfaenger: zahlungsempfaengerEntry[] =
            await zahlungsempfänger.get(element);

        let entry = new girokontoEntity(
            config.convertDateFormat(element.Buchungstag.toString()),
            element.Verwendungszweck,
            config.converteBetragFormat(element.Betrag),
            config.converteBetragFormat(element["Saldo nach Buchung"]),
            element.Kategorie,
            zahlungsempfaenger[0].ID_ZAHLUNGSEMPFAENGER
        );

        const result = await girokontoRepo.insert(girokontoEntity);

        return result;
    } catch (err) {
        console.error(
            `Beim Hinzufügen von Girokonten Einträgen gab es ein Problem: \n${err}`
        );
    }
}

export async function readIn(req: Request, res: Response) {
    // try {
    //     for (let idx = 0; idx < csvData.length; idx++) {
    //         let entry = await check(csvData[idx]);
    //         if (entry.length === 0) {
    //             let result = await insert(csvData[idx]);
    //         }
    //     }
    //     res.status(200).send("Alle Girokonto Daten wurde eingelesen.");
    // } catch (err) {
    //     console.error(
    //         `Es gab ein Problem beim Einlesen des Girokontos: ${err}`
    //     );
    //     res.status(400).send(
    //         `Es gab ein Problem beim Einlesen der Girokontos:`
    //     );
    // }
}
