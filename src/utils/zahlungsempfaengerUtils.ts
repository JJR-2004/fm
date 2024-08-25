import { Request, Response, NextFunction } from "express";
import { Transaction } from "../categories/transaction";
import config from "./index";
import * as zahlungsempfaengerRepo from "../repositories/zahlungsempfaengerRepo";
import { zahlungsempfaenger as zahlumgsempfaengerEntity } from "../entity/zahlungsempfaengerEntity";

const csvData = config.csvData;

export async function insertCSVEntry(element: Transaction) {
    try {
        const isExisting = await zahlungsempfaengerRepo.getEntrybyIBAN(
            element["IBAN Zahlungsbeteiligter"]
        );

        if (!isExisting) {
            let entry = new zahlumgsempfaengerEntity(
                element["IBAN Zahlungsbeteiligter"],
                element["Name Zahlungsbeteiligter"]
            );
            return await zahlungsempfaengerRepo.insert(entry);
        }
    } catch (err) {
        throw new Error(`Zahlungsempfänger InsertCSVEntry Error: ${err}`);
    }
}

export async function get(req: Request, res: Response) {
    try {
        let result = await zahlungsempfaengerRepo.get();
        res.status(200).send(result);
    } catch (ex) {
        console.log(`Fehler beom Auslesen der Zahlungsempfänger: ${ex}`);
    }
}
