// entity/User.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToMany,
    ManyToOne,
} from "typeorm";
import { girokonto } from "./girokontoEntity";

@Entity({ name: "kategorie" })
export class Kategorie {
    constructor(NAME: string) {
        this.NAME = NAME;
    }

    @PrimaryGeneratedColumn()
    ID_KATEGORIE!: number;

    @Column({ type: "varchar", length: 100 })
    NAME!: string;

    @OneToMany(() => girokonto, (girokonto) => girokonto.KATEGORIE)
    GIROKONT_ENTRYs!: girokonto[];
}
