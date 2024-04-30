import { Injectable } from '@nestjs/common';
import { CheeseRepository } from './cheeses.repository';
import { CreateCheeseDto } from './dto/create-cheese.dto';
import { Cheese } from './cheese.entity';

@Injectable()
export class ProductsService {
  constructor(private readonly cheeseRepository: CheeseRepository) {}

  async createCheese(createCheeseDto: CreateCheeseDto): Promise<Cheese> {
    return await this.cheeseRepository.createCheese(createCheeseDto);
  }

  async getAllCheeses(): Promise<Cheese[]> {
    return await this.cheeseRepository.find();
  }
}
