import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CheesesRepository } from './cheeses.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cheese } from './cheese.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cheese])],
  controllers: [ProductsController],
  providers: [ProductsService, CheesesRepository],
})
export class ProductsModule {}
