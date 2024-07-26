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
export class zahlumgsempfaenger {
    @PrimaryGeneratedColumn()
    ID_ZAHLUNGSEMPFAENGER: number | undefined;

    @Column()
    IBAN: string | undefined;

    @Column()
    NAME: string | undefined;
}
