import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Checkpoint {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column('geometry', { spatialFeatureType: 'Point', srid: 4326 })
    coords: string;
    @ManyToOne(() => User, user => user.checkpoints)
    user: User;
}
