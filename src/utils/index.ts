import { Transaction } from "../categories/transaction";
import moment from "moment";
import { parse } from "csv-parse";
import { Request, Response, NextFunction } from "express";
import * as zahlungsempfängerUtils from "./zahlungsempfaengerUtils";
import * as girokontoUtils from "./girokontoUtils";
import * as kategorieUtils from "./kategoireUtils";

const headers = [
    "Bezeichnung Auftragskonto",
    "IBAN Auftragskonto",
    "BIC Auftragskonto",
    "Bankname Auftragskonto",
    "Buchungstag",
    "Valutadatum",
    "Name Zahlungsbeteiligter",
    "IBAN Zahlungsbeteiligter",
    "BIC (SWIFT-Code) Zahlungsbeteiligter",
    "Buchungstext",
    "Verwendungszweck",
    "Betrag",
    "Waehrung",
    "Saldo nach Buchung",
    "Bemerkung",
    "Kategorie",
    "Steuerrelevant",
    "Glaeubiger ID",
    "Mandatsreferenz",
];

function getCSVData(data: string): Promise<Transaction[]> {
    return new Promise<Transaction[]>((resolve, reject) => {
        parse(
            data,
            {
                delimiter: ";",
                columns: headers,
                trim: true,
                skip_empty_lines: true,
            },
            (err, result: Transaction[]) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }
        );
    });
}

export async function readInCSVData(req: Request, res: Response) {
    try {
        const data = (await getCSVData(req.body.data)).splice(1);

        for (const element of data) {
            await kategorieUtils.insertCSVEntry(element);
            await zahlungsempfängerUtils.insertCSVEntry(element);
            await girokontoUtils.insertCsvEntry(element);
        }

        res.status(200).send(data);
    } catch (err) {
        console.log("Read In CSV ERROR: ", err);
        res.status(500).send(err);
    }
}

class Config {
    csvData: Transaction[] = [];

    convertDateFormat(date: any): string {
        if (date.length !== 10) {
            throw new Error(
                `convertDateFormat | Falsches Datumsformat. Erwartet DDMMMYYYY | Bekommen ${date}`
            );
        }

        const formattedDate = moment(date, "DD.MM.YYYY", true); // das True, erzwingt eine strickte überprüfung

        if (!formattedDate.isValid()) {
            throw new Error(
                `convertDateFormat | Ungültiges Datum. Erwartet DD.MM.YYYY | Bekommen ${date}`
            );
        }

        return formattedDate.format("YYYY-MM-DD");
    }

    convertDateFormattoNormal(date: string): string {
        if (date.length !== 10) {
            throw new Error(
                `convertDateFormat | Falsches Datumsformat. Erwartet DDMMMYYYY | Bekommen ${date}`
            );
        }

        return moment(date).format("DD.MM.YYYY");
    }

    converteBetragFormat(betrag: string): number {
        betrag = betrag.replace(",", ".");

        let decimal = parseFloat(betrag);

        if (isNaN(decimal)) {
            throw new Error(
                `converteBetragFormat | Falsches Format für den Betrag: ${betrag}`
            );
        }

        return decimal;
    }
}

const config = new Config();

export default config;
