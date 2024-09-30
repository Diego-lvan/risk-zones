import { Checkpoint } from "src/checkpoint/entities/checkpoint.entity";
import { News } from "src/risk-zones/entities/news.entity";
import { Entity, PrimaryGeneratedColumn, OneToOne, OneToMany } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @OneToMany(() => News, (news) => news.user)   
    newsList: News[];
    @OneToMany(() => Checkpoint, (checkpoint) => checkpoint.user)
    checkpoints: Checkpoint[];
}

