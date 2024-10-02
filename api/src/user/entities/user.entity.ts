import { News } from 'src/news/entities/news.entity';
import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => News, (news) => news.user)   
    newsList: News[];
}