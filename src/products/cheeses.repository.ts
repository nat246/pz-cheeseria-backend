import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Cheese } from './cheese.entity';
import { CreateCheeseDto } from './dto/create-cheese.dto';
import { GetCheesesFilterDto } from './dto/get-cheese-filter.dto';

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
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Cheese already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getCheesesBySearch(
    cheesesFilterDto: GetCheesesFilterDto,
  ): Promise<Cheese[]> {
    const { search, color } = cheesesFilterDto;

    const query = this.createQueryBuilder('cheese');

    if (color) {
      query.andWhere('cheese.color = :color', { color });
    }

    if (search) {
      query.andWhere(
        'LOWER(cheese.name) LIKE LOWER(:search) OR LOWER(cheese.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    const cheeses = await query.getMany();
    return cheeses;
  }
}

const kebabCase = (str) =>
  str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
