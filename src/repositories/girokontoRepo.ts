import { AppDataSource } from "../database/data-source";
import { girokonto as girokontoEntity } from "../entity/girokontoEntity";

const girokontoRepo = AppDataSource.getRepository(girokontoEntity);

export async function get() {
    let result = await girokontoRepo
        .createQueryBuilder("girokonto")
        .leftJoinAndSelect("girokonto.ZAHLUNGSEMPFAENGER", "zahlungsempfaenger")
        .leftJoinAndSelect("girokonto.KATEGORIE", "kategorie")
        .orderBy("girokonto.BUCHUNGSTAG", "DESC")
        .getMany();
    return result;
}

export async function insert(entry: girokontoEntity) {
    return await girokontoRepo.save(entry);
}

export async function getEntrybyID(id: number) {
    return await girokontoRepo
        .createQueryBuilder("girokonto")
        .where("girokonto.ID_GIROKONTO = :id", { id: id })
        .getOne();
}

export async function getEntrybyParams(
    buchungstag: string,
    betrag: number,
    saldo_nach_buchung: number
) {
    return await girokontoRepo
        .createQueryBuilder("girokonto")
        .where("girokonto.BUCHUNGSTAG = :buchungstag", {
            buchungstag: buchungstag,
        })
        .andWhere("girokonto.BETRAG = :betrag", { betrag: betrag })
        .andWhere("girokonto.SALDO_NACH_BUCHUNG = saldo_nach_buchung", {
            saldo_nach_buchung: saldo_nach_buchung,
        })
        .getOne();
}
