// entity/User.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToMany,
    ManyToOne,
    OneToOne,
    Relation,
} from "typeorm";
import { zahlumgsempfaenger } from "./zahlungsempfaengerEntity";

@Entity()
export class girokontoEntity {
    constructor(
        BUCHUNGSTAG: string,
        VERWENDUNGSZWECK: string,
        BETRAG: number,
        SALDO_NACH_BUCHUNG: number,
        KATEGORIE: string,
        ZAHLUNGSEMPFÄNGER_ID: number
    ) {
        BUCHUNGSTAG = BUCHUNGSTAG;
        VERWENDUNGSZWECK = VERWENDUNGSZWECK;
        BETRAG = BETRAG;
        SALDO_NACH_BUCHUNG = SALDO_NACH_BUCHUNG;
        KATEGORIE = KATEGORIE;
        ZAHLUNGSEMPFÄNGER_ID = ZAHLUNGSEMPFÄNGER_ID;
    }

    @PrimaryGeneratedColumn()
    ID_GIROKONTO!: number;

    @Column()
    BUCHUNGSTAG?: string;

    @Column()
    VERWENDUNGSZWECK?: string;

    @Column()
    BETRAG?: number;

    @Column()
    SALDO_NACH_BUCHUNG?: number;

    @Column()
    KATEGORIE?: string;

    @Column()
    ZAHLUNGSEMPFAENGER_ID?: number;
}
