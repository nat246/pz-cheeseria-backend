import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateCheeseDto } from './dto/create-cheese.dto';
import { Cheese } from './cheese.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  async createCheese(
    @Body() createCheeseDto: CreateCheeseDto,
  ): Promise<Cheese> {
    return await this.productService.createCheese(createCheeseDto);
  }

  @Get('/all')
  async getAllCheeses(): Promise<Cheese[]> {
    return await this.productService.getAllCheeses();
  }
}
