import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price!: number;

  @Column({ nullable: true })
  qty?: number;
}
