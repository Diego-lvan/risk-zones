import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Checkpoint {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column({type: 'point'})
    coords: string;
    @ManyToOne(() => User, user => user.checkpoints)
    user: User;
}
