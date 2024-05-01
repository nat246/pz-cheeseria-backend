import { Injectable } from '@nestjs/common';
import { CheesesRepository } from './cheeses.repository';
import { CreateCheeseDto } from './dto/create-cheese.dto';
import { Cheese } from './cheese.entity';

@Injectable()
export class ProductsService {
  constructor(private readonly cheesesRepository: CheesesRepository) {}

  async createCheese(createCheeseDto: CreateCheeseDto): Promise<Cheese> {
    return await this.cheesesRepository.createCheese(createCheeseDto);
  }

  async getAllCheeses(): Promise<Cheese[]> {
    return await this.cheesesRepository.find();
  }
}
