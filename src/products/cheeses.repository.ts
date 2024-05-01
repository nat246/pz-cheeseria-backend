import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Cheese } from './cheese.entity';
import { CreateCheeseDto } from './dto/create-cheese.dto';

@Injectable()
export class CheesesRepository extends Repository<Cheese> {
  constructor(private dataSource: DataSource) {
    super(Cheese, dataSource.createEntityManager());
  }

  async createCheese(createCheeseDto: CreateCheeseDto): Promise<void> {
    const { name, description, image, price, color } = createCheeseDto;

    const id: string = kebabCase(name);

    // Check if id already exists in database
    const cheeseExist = await this.findOneBy({ id });

    if (cheeseExist) {
      throw new ConflictException('Already exists');
    }

    const cheese: Cheese = this.create({
      id,
      name,
      description,
      image,
      price,
      color,
    });

    try {
      await this.save(cheese);
      console.log('success');
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Cheese already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}

const kebabCase = (str) =>
  str
    .replace(/([a-z])([A-Z])/g, '$1-$2') // Capitalize the next letter after a lowercase letter
    .replace(/[\s_]+/g, '-') // Replace spaces and underscores with hyphens
    .toLowerCase();
