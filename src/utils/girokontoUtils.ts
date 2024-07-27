import { resolve } from "path";
import { Request, Response, NextFunction } from "express";
import { Transaction } from "../categories/transaction";
import { zahlungsempfaengerEntry } from "../categories/zahlungsempfaengerEntry";
import config from "../index";
import * as zahlungsempfänger from "./zahlungsempfaengerUtils";
import { AppDataSource } from "../database/data-source";
import * as girokontoRepo from "../repositories/girokontoRepo";
import * as zahlungsempfaengerRepo from "../repositories/zahlungsempfaengerRepo";
import { girokonto as girokontoEntity } from "../entity/girokontoEntity";
import { zahlungsempfaenger as zahlumgsempfaengerEntity } from "../entity/zahlungsempfaengerEntity";

const csvData = config.csvData;

async function check(element: Transaction) {
    try {
        const zahlungsempfänger: zahlumgsempfaengerEntity[] =
            await zahlungsempfaengerRepo.getEntrybyParams({
                where: {
                    IBAN: element["IBAN Zahlungsbeteiligter"],
                    NAME: element["Name Zahlungsbeteiligter"],
                },
            });
        const filter = {
            where: {
                BUCHUNGSTAG: config.convertDateFormat(
                    element.Buchungstag.toString()
                ),
                BETRAG: config.converteBetragFormat(element.Betrag),
                ZAHLUNGSEMPFAENGER_ID:
                    zahlungsempfänger[0].ID_ZAHLUNGSEMPFAENGER,
            },
        };

        console.log(filter);

        let result = await girokontoRepo.getEntrybyParams(filter);

        console.log("Result: ", result);

        return result;
    } catch (ex) {
        console.log(
            `Beim Prüfen ob der Girokonto Eintrag bereits vorhanden ist, ist ein Fehler unterlaufen: ${ex}`
        );
    }
}

export async function get(req: Request, res: Response) {
    try {
        let result = await girokontoRepo.get();
        res.status(200).send(result);
    } catch (ex) {
        console.error(`Probleme beim Auslesen der Girokonto Einträge: ${ex}`);
        res.status(404).send(
            `Probleme beim Auslesen der Girokonto Einträge: ${ex}`
        );
    }
}

async function insert(element: Transaction) {
    try {
        let zahlungsempfaenger: zahlumgsempfaengerEntity[] =
            await zahlungsempfänger.getEntrybyParams(element);

        if (zahlungsempfaenger.length) {
            let entry = new girokontoEntity(
                config.convertDateFormat(element.Buchungstag.toString()),
                element.Verwendungszweck,
                config.converteBetragFormat(element.Betrag),
                config.converteBetragFormat(element["Saldo nach Buchung"]),
                element.Kategorie,
                zahlungsempfaenger[0].ID_ZAHLUNGSEMPFAENGER!
            );

            console.log("Insert_Entry: ", entry);

            const result = await girokontoRepo.insert(entry);

            return result;
        }

        return;
    } catch (err) {
        console.log(
            `Beim Hinzufügen von Girokonten Einträgen gab es ein Problem: \n${err}`
        );
    }
}

export async function readIn(req: Request, res: Response) {
    try {
        for (let idx = 0; idx < csvData.length; idx++) {
            let entry = await check(csvData[idx]);
            console.log(entry);
            if (entry!.length === 0) {
                let result = await insert(csvData[idx]);
            }
        }
        res.status(200).send("Alle Girokonto Daten wurde eingelesen.");
    } catch (err) {
        console.log(`Es gab ein Problem beim Einlesen des Girokontos: ${err}`);
        res.status(400).send(
            `Es gab ein Problem beim Einlesen der Girokontos: ${err}`
        );
    }
}
