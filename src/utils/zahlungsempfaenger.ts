import { resolve } from "path";
import { getCSVData } from "../ReadInCSV";
import { Request, Response, NextFunction } from "express";
import { Transaction } from "../categories/transaction";
import config from "../index";
import { zahlungsempfaengerEntry } from "../categories/zahlungsempfaengerEntry";

export async function insert(element: Transaction) {
    return result;
}

export async function get(element: Transaction) {
    return restult;
}

export async function readInZahlungsempfänger(req: Request, res: Response) {
    try {
        for (let idx = 0; idx < csvData.length; idx++) {
            let zahlungsempfaenger = await get(csvData[idx]);

            if (
                csvData[idx]["IBAN Zahlungsbeteiligter"] !== "" &&
                zahlungsempfaenger.length == 0
            ) {
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
