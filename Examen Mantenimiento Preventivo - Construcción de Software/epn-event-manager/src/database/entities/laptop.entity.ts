import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('laptops')
export class LaptopEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  brand?: string;

  @Column({ nullable: true, type: 'integer' })
  ram?: number;

  @Column({ nullable: true, type: 'integer' })
  storage?: number;

  @Column({ nullable: true })
  createdAt?: string;
}
