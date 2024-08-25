import { Transaction } from "../categories/transaction";
import { Kategorie as kategorieEntitiy } from "../entity/kategorieEntitiy";
import * as kategorieRepo from "../repositories/kategorieRepo";
import { Request, Response, NextFunction } from "express";

export async function insertCSVEntry(element: Transaction) {
    try {
        const exists = await kategorieRepo.getByName(element.Kategorie);

        console.log("KATEGOIRE_exists: ", exists);

        if (!exists) {
            const kategorie = new kategorieEntitiy(element.Kategorie);

            // console.log(kategorie);

            kategorieRepo.insert(kategorie);
        }
    } catch (err) {
        throw new Error(`Kategorie Insert Error: ${err}`);
    }
}

export async function getEntryByName(name: string) {
    try {
        return await kategorieRepo.getByName(name);
    } catch (err) {
        throw new Error(`Kategoire getEntryByName Error: ${err}`);
    }
}

export async function get(req: Request, res: Response) {
    try {
        const result = await kategorieRepo.get();
        res.status(200).send(result);
    } catch (err) {
        console.log(`katgorieUtils get Error: ${err}`);
        res.status(500).send(err);
    }
}
