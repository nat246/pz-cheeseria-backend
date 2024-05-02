import { Column, Entity, PrimaryColumn, Unique } from 'typeorm';
import { CheeseColor } from './cheese-color.enum';

@Entity()
@Unique(['id'])
@Unique(['name'])
export class Cheese {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column()
  image: string;

  @Column('real', { scale: 2 })
  price: number;

  @Column({ type: 'text' })
  color: CheeseColor;
}
