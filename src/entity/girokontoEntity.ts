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

@Entity()
export class girokonto {
    constructor(
        BUCHUNGSTAG: string,
        VERWENDUNGSZWECK: string,
        BETRAG: number,
        SALDO_NACH_BUCHUNG: number,
        KATEGORIE: string,
        ZAHLUNGSEMPFAENGER_ID: number
    ) {
        this.BUCHUNGSTAG = BUCHUNGSTAG;
        this.VERWENDUNGSZWECK = VERWENDUNGSZWECK;
        this.BETRAG = BETRAG;
        this.SALDO_NACH_BUCHUNG = SALDO_NACH_BUCHUNG;
        this.KATEGORIE = KATEGORIE;
        this.ZAHLUNGSEMPFAENGER_ID = ZAHLUNGSEMPFAENGER_ID;
    }

    @PrimaryGeneratedColumn()
    ID_GIROKONTO!: number;

    @Column({ type: "varchar", length: 50 })
    BUCHUNGSTAG: string;

    @Column({ type: "varchar", length: 255 })
    VERWENDUNGSZWECK: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    BETRAG: number;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    SALDO_NACH_BUCHUNG: number;

    @Column({ type: "varchar", length: 50 })
    KATEGORIE: string;

    @Column({ type: "int" })
    ZAHLUNGSEMPFAENGER_ID: number;
}
