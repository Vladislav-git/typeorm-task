import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";




@Entity('products')
export class Product extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    type: string;

    @Column()
    price: string;

    @Column()
    picture: string;

}