// entity/User.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToMany,
    ManyToOne,
} from "typeorm";

@Entity()
export class zahlungsempfaenger {
    constructor(IBAN: string, NAME: string) {
        this.IBAN = IBAN;
        this.NAME = NAME;
    }

    @PrimaryGeneratedColumn()
    ID_ZAHLUNGSEMPFAENGER!: number;

    @Column({ type: "varchar", length: 45 })
    IBAN: string;

    @Column({ type: "varchar", length: 100 })
    NAME: string;
}
