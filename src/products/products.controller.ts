import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateCheeseDto } from './dto/create-cheese.dto';
import { Cheese } from './cheese.entity';
import { UpdateCheeseDto } from './dto/update-cheese.dto';

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
    return this.productService.getCheeseById(id);
  }

  // Update cheese
  @Patch('/cheese/:id')
  async udpateCheeseDetails(
    @Param('id') id: string,
    @Body() updateCheeseDto: UpdateCheeseDto,
  ): Promise<Cheese> {
    return this.productService.updateCheeseDetails(id, updateCheeseDto);
  }

  // Delete Cheese
  @Delete('/cheese/:id')
  async deleteCheese(@Param('id') id: string): Promise<void> {
    return this.productService.deleteCheese(id);
  }
}
