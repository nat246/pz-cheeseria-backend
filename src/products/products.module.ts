import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CheeseRepository } from './cheeses.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cheese } from './cheese.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cheese])],
  controllers: [ProductsController],
  providers: [ProductsService, CheeseRepository],
})
export class ProductsModule {}
