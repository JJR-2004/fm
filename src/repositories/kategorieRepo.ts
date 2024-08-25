import { AppDataSource } from "../database/data-source";
import { Kategorie as kategorieEntity } from "../entity/kategorieEntitiy";
const kategorieRepo = AppDataSource.getRepository(kategorieEntity);

export async function get() {
    let result = await kategorieRepo.createQueryBuilder("kategorie").getMany();
    return result;
}

export async function insert(entry: kategorieEntity) {
    return await kategorieRepo.save(entry);
}

export async function getByName(name: string) {
    return await kategorieRepo
        .createQueryBuilder("kategorie")
        .where("kategorie.NAME = :name", { name: name })
        .getOne();
}
