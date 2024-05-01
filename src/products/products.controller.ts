import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateCheeseDto } from './dto/create-cheese.dto';
import { Cheese } from './cheese.entity';
import { UpdateCheeseDto } from './dto/update-cheese.dto';
import { GetCheesesFilterDto } from './dto/get-cheese-filter.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  async createCheese(@Body() createCheeseDto: CreateCheeseDto): Promise<void> {
    return await this.productService.createCheese(createCheeseDto);
  }

  @Get('/cheese/all')
  async getAllCheeses(): Promise<Cheese[]> {
    return await this.productService.getAllCheeses();
  }

  // Get cheese by ID
  @Get('/cheese/:id')
  async getCheeseById(@Param('id') id: string): Promise<Cheese> {
    return await this.productService.getCheeseById(id);
  }

  // Get cheese by search
  @Get('/cheese')
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'color', required: false })
  async getCheesesBySearch(
    @Query() cheesesFilterDto: GetCheesesFilterDto,
  ): Promise<Cheese[]> {
    return await this.productService.getCheesesBySearch(cheesesFilterDto);
  }

  // Update cheese
  @Patch('/cheese/:id')
  async updateCheeseDetails(
    @Param('id') id: string,
    @Body() updateCheeseDto: UpdateCheeseDto,
  ): Promise<Cheese> {
    return await this.productService.updateCheeseDetails(id, updateCheeseDto);
  }

  // Delete Cheese
  @Delete('/cheese/:id')
  async deleteCheese(@Param('id') id: string): Promise<void> {
    return await this.productService.deleteCheese(id);
  }
}
