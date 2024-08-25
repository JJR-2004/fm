import { resolve } from "path";
import { Request, Response, NextFunction } from "express";
import { Transaction } from "../categories/transaction";
import config from "./index";
import * as girokontoRepo from "../repositories/girokontoRepo";
import * as zahlungsempfaengerRepo from "../repositories/zahlungsempfaengerRepo";
import * as kategorieRepo from "../repositories/kategorieRepo";
import { girokonto as girokontoEntity } from "../entity/girokontoEntity";
async function exists(element: Transaction): Promise<boolean> {
    try {
        const result: girokontoEntity | null =
            await girokontoRepo.getEntrybyParams(
                config.convertDateFormat(element.Buchungstag),
                config.converteBetragFormat(element.Betrag),
                config.converteBetragFormat(element["Saldo nach Buchung"])
            );
        return result ? true : false;
    } catch (err) {
        throw new Error(`{GirokontoUtils exists Error: ${err}}`);
    }
}

export async function get(req: Request, res: Response) {
    try {
        let result = await girokontoRepo.get();

        result.forEach((element) => {
            element.BUCHUNGSTAG = config.convertDateFormattoNormal(
                element.BUCHUNGSTAG
            );
        });

        res.status(200).send(result);
    } catch (ex) {
        console.error(`Probleme beim Auslesen der Girokonto Einträge: ${ex}`);
        res.status(500).send(
            `Probleme beim Auslesen der Girokonto Einträge: ${ex}`
        );
    }
}

export async function insertCsvEntry(element: Transaction) {
    const zahlungsempfaenger = await zahlungsempfaengerRepo.getEntrybyIBAN(
        element["IBAN Zahlungsbeteiligter"]
    );
    const kategorie = await kategorieRepo.getByName(element.Kategorie);

    // Prüfen ob, entry bereits vorhanden ist, da man den Verwendungszweck und Kategorie ändern kann.
    const isExisting = await exists(element);

    console.log(
        `zahlungsempfänger: ${JSON.stringify(
            zahlungsempfaenger
        )}\n kategoire: ${JSON.stringify(
            kategorie
        )}\n isExisting: ${JSON.stringify(
            isExisting
        )}\n entry: ${JSON.stringify(element)}`
    );

    if (!isExisting && kategorie && zahlungsempfaenger) {
        let entry = new girokontoEntity(
            config.convertDateFormat(element.Buchungstag.toString()),
            element.Verwendungszweck,
            config.converteBetragFormat(element.Betrag),
            config.converteBetragFormat(element["Saldo nach Buchung"]),
            kategorie,
            zahlungsempfaenger
        );

        console.log("Insert_Entry: ", entry);

        const result = await girokontoRepo.insert(entry);

        return result;
    } else if (!zahlungsempfaenger) {
        throw new Error(
            `Kein Zahlungsempfänger mit IBAN: ${element["IBAN Zahlungsbeteiligter"]}`
        );
    }
}

export async function insert(req: Request, res: Response) {
    const entry: any = req.body;

    try {
        entry.BUCHUNGSTAG = config.convertDateFormat(entry.BUCHUNGSTAG);
        const result = await girokontoRepo.insert(entry);
        res.status(200).send(result);
    } catch (err) {
        console.log(`Girokonto insert: ${err}`);
        res.status(500).send(`Girokonto insert: ${err}`);
    }
}
