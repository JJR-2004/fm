import { getCSVData } from "./ReadInCSV";
import { Transaction } from "./categories/transaction";

class Config {
    csvData: Transaction[] = [];

    constructor() {
        // You can't use await here directly, so we call an async method.
        this.initialize();
    }

    // Define an async method for initialization.
    async initialize() {
        try {
            this.csvData = await getCSVData();
        } catch (error) {
            console.error("Error initializing Config:", error);
        }
    }

    convertDateFormat(date: string) {
        if (date.length !== 10) {
            throw new Error(
                `convertDateFormat | Falsches Datumsformat. Erwartet DDMMMYYYY | Bekommen ${date}`
            );
        }
        const day = date.slice(0, 2);
        const month = date.slice(3, 5);
        const year = date.slice(6, 10);

        return `${year}-${month}-${day}`;
    }

    converteBetragFormat(betrag: string) {
        betrag = betrag.replace(",", ".");

        let decimal = parseFloat(betrag);

        console.log("DEZIMAL: ", decimal);

        if (isNaN(decimal)) {
            throw new Error(
                `converteBetragFormat | Falsches Format für den Betrag: ${betrag}`
            );
        }

        return decimal;
    }
}

const config = new Config();

await config.initialize();

export default config;
