import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateCheeseDto } from './dto/create-cheese.dto';
import { Cheese } from './cheese.entity';
import { ApiBody } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  @ApiBody({ type: CreateCheeseDto })
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
