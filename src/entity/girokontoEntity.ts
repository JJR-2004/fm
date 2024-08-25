import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToMany,
    ManyToOne,
    OneToOne,
    Relation,
    JoinColumn,
} from "typeorm";
import { zahlungsempfaenger } from "./zahlungsempfaengerEntity";
import { Kategorie } from "./kategorieEntitiy";

@Entity()
export class girokonto {
    constructor(
        BUCHUNGSTAG: string,
        VERWENDUNGSZWECK: string,
        BETRAG: number,
        SALDO_NACH_BUCHUNG: number,
        KATEGORIE: Kategorie,
        ZAHLUNGSEMPFAENGER: zahlungsempfaenger
    ) {
        this.BUCHUNGSTAG = BUCHUNGSTAG;
        this.VERWENDUNGSZWECK = VERWENDUNGSZWECK;
        this.BETRAG = BETRAG;
        this.SALDO_NACH_BUCHUNG = SALDO_NACH_BUCHUNG;
        this.KATEGORIE = KATEGORIE;
        this.ZAHLUNGSEMPFAENGER = ZAHLUNGSEMPFAENGER;
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

    @ManyToOne(
        () => zahlungsempfaenger,
        (zahlungsempfänger) => zahlungsempfänger.ID_ZAHLUNGSEMPFAENGER
    )
    @JoinColumn({ name: "ZAHLUNGSEMPFAENGER_ID" })
    ZAHLUNGSEMPFAENGER!: zahlungsempfaenger;

    @ManyToOne(() => Kategorie, (kategorie) => kategorie.ID_KATEGORIE)
    @JoinColumn({ name: "KATEGORIE_ID" })
    KATEGORIE!: Kategorie;
}
