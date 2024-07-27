import { AppDataSource } from "../database/data-source";
import { girokonto as girokontoEntity } from "../entity/girokontoEntity";

const girokontoRepo = AppDataSource.getRepository(girokontoEntity);

export async function get() {
    let result = await girokontoRepo.find();
    return result;
}

export async function insert(entry: girokontoEntity) {
    return await girokontoRepo.save(entry);
}

export async function getEntrybyID(id: number) {
    return await girokontoRepo.find({
        where: {
            ID_GIROKONTO: id,
        },
    });
}

export async function getEntrybyParams(params: any) {
    return await girokontoRepo.find(params);
}
