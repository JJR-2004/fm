import { AppDataSource } from "../database/data-source";
import { girokontoEntity } from "../entity/girokontoEntity";

const girokontoRepo = AppDataSource.getRepository(girokontoEntity);

export async function get() {
    return await girokontoRepo.find();
}

export async function insert(entry: girokontoEntity) {
    return await girokontoRepo.save(entry);
}
