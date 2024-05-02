import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CheesesRepository } from './cheeses.repository';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Cheese } from './cheese.entity';
import { CheeseSeederService } from './seed/cheese-seeder.service';
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Cheese])],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    CheesesRepository,
    // Seed data for 5 cheeses
    CheeseSeederService,
    {
      provide: 'APP_INIT',
      useFactory: async (cheeseRepository: Repository<Cheese>) => {
        const seederService = new CheeseSeederService(cheeseRepository);
        await seederService.seedData();
      },
      inject: [getRepositoryToken(Cheese)],
    },
  ],
})
export class ProductsModule {}
