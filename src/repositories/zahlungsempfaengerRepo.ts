import { AppDataSource } from "../database/data-source";
import { zahlungsempfaenger as zahlumgsempfaengerEntity } from "../entity/zahlungsempfaengerEntity";

const zahlungsempfaengerRepo = AppDataSource.getRepository(
    zahlumgsempfaengerEntity
);

export async function get() {
    return await zahlungsempfaengerRepo.find();
}

export async function insert(entry: zahlumgsempfaengerEntity) {
    return await zahlungsempfaengerRepo.save(entry);
}

export async function getEntrybyID(id: number) {
    return await zahlungsempfaengerRepo.find({
        where: {
            ID_ZAHLUNGSEMPFAENGER: id,
        },
    });
}

export async function getEntrybyParams(params: any) {
    console.log("params: ", params);
    return await zahlungsempfaengerRepo.find(params);
}
