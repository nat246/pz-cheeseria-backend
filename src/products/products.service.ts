import { Injectable, NotFoundException } from '@nestjs/common';
import { CheesesRepository } from './cheeses.repository';
import { CreateCheeseDto } from './dto/create-cheese.dto';
import { Cheese } from './cheese.entity';
import { UpdateCheeseDto } from './dto/update-cheese.dto';
import { GetCheesesFilterDto } from './dto/get-cheese-filter.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly cheesesRepository: CheesesRepository) {}

  async createCheese(createCheeseDto: CreateCheeseDto): Promise<void> {
    return await this.cheesesRepository.createCheese(createCheeseDto);
  }

  async getAllCheeses(): Promise<Cheese[]> {
    return await this.cheesesRepository.find();
  }

  async getCheeseById(id: string): Promise<Cheese> {
    const found = await this.cheesesRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException(`Cheese with ID ${id} not found`);
    }

    return found;
  }

  async getCheesesBySearch(
    cheesesFilterDto: GetCheesesFilterDto,
  ): Promise<Cheese[]> {
    return await this.cheesesRepository.getCheesesBySearch(cheesesFilterDto);
  }

  async updateCheeseDetails(
    id: string,
    updateCheeseDto: UpdateCheeseDto,
  ): Promise<Cheese> {
    const { description, image, price } = updateCheeseDto;
    const cheese: Cheese = await this.getCheeseById(id);

    if (description) {
      cheese.description = description;
    }

    if (image) {
      cheese.image = image;
    }

    if (price) {
      cheese.price = price;
    }

    await this.cheesesRepository.save(cheese);

    return cheese;
  }

  async deleteCheese(id: string): Promise<void> {
    const result = await this.cheesesRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Cheese with ID ${id} not found`);
    }
  }
}
