import { resolve } from "path";
import { getCSVData } from "../ReadInCSV";
import { Request, Response, NextFunction } from "express";
import { Transaction } from "../categories/transaction";
import config from "../index";
import { zahlungsempfaengerEntry } from "../categories/zahlungsempfaengerEntry";
import * as zahlungsempfaengerRepo from "../repositories/zahlungsempfaengerRepo";
import { zahlungsempfaenger as zahlumgsempfaengerEntity } from "../entity/zahlungsempfaengerEntity";

const csvData = config.csvData;

export async function insert(element: Transaction) {
    let entry = new zahlumgsempfaengerEntity(
        element["IBAN Zahlungsbeteiligter"],
        element["Name Zahlungsbeteiligter"]
    );
    return await zahlungsempfaengerRepo.insert(entry);
}

export async function get(req: Request, res: Response) {
    try {
        let result = await zahlungsempfaengerRepo.get();
        res.status(200).send(result);
    } catch (ex) {
        console.log(`Fehler beom Auslesen der Zahlungsempfänger: ${ex}`);
    }
}

export async function getEntrybyParams(element: Transaction) {
    let filter = {
        where: {
            IBAN: element["IBAN Zahlungsbeteiligter"],
            NAME: element["Name Zahlungsbeteiligter"],
        },
    };
    return await zahlungsempfaengerRepo.getEntrybyParams(filter);
}

export async function readInZahlungsempfänger(req: Request, res: Response) {
    try {
        for (let idx = 0; idx < csvData.length; idx++) {
            let zahlungsempfaenger = await getEntrybyParams(csvData[idx]);

            if (zahlungsempfaenger.length == 0) {
                let result = await insert(csvData[idx]);
            }
        }
        res.status(200).send("Alle Zahlungsempänger wurde eingelesen.");
    } catch (err) {
        console.error(
            `Es gab ein Problem beim Einlesen der Zahlungsempfänger: ${err}`
        );
        res.status(404).send(
            `Es gab ein Problem beim Einlesen der Zahlungsempfänger:`
        );
    }
}
