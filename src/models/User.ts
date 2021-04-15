import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";

import { v4 as uuid } from "uuid";

@Entity("users")
class User {
    @PrimaryColumn()
    readonly id: string;

    // o ponto de exclamação foi colocado automaticamente pelo vscode para ignorar os erros
    @Column()
    name!: string;

    @Column()
    email!: string;

    @CreateDateColumn()
    created_at!: Date;

    constructor() {
        if (this!.id == undefined || this.id == null) {
            this.id = uuid();
        }
    }
}

export { User };
