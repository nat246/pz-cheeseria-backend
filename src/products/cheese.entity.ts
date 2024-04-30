import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CheeseColor } from './cheese-color.enum';

@Entity()
export class Cheese {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  price: number;

  @Column({ type: 'text' })
  color: CheeseColor;
}
