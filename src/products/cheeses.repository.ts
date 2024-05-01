import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Cheese } from './cheese.entity';
import { CreateCheeseDto } from './dto/create-cheese.dto';

@Injectable()
export class CheesesRepository extends Repository<Cheese> {
  constructor(private dataSource: DataSource) {
    super(Cheese, dataSource.createEntityManager());
  }

  async createCheese(createCheeseDto: CreateCheeseDto): Promise<Cheese> {
    const { name, description, image, price, color } = createCheeseDto;

    const cheese = this.create({
      name,
      description,
      image,
      price,
      color,
    });

    await this.save(cheese);

    return cheese;
  }
}
