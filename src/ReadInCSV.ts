import { resolve } from "path";
import fs from "fs";
import csv from "csv-parser";
import { parse } from "csv-parse";
import { Transaction } from "./categories/transaction";

class CSVReader {
    path =
        "C:/Users/JJ-Ro/Downloads/Umsaetze_DE70216900200001842463_2024.04.30.csv";

    headers = [
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

    async readCSV(): Promise<Transaction[]> {
        const fileContent = await fs.readFileSync(this.path, {
            encoding: "utf-8",
        });

        return new Promise((resolve, reject) => {
            parse(
                fileContent,
                {
                    delimiter: ";",
                    columns: this.headers,
                    trim: true,
                    skip_empty_lines: true,
                },
                (error, result: Transaction[]) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }
}

// Example usage:
export async function getCSVData() {
    const reader = new CSVReader();
    const results = await reader
        .readCSV()
        .then((data) => {
            return data;
        })
        .catch((err) => {
            console.error(
                `Es gab ein Problem beim Auslesen der CSV-Datei: \n${err}`
            );
            return [];
        });
    return results.slice(1);
}
