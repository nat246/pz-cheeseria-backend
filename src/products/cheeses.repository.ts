import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Cheese } from './cheese.entity';

@Injectable()
export class CheeseRepository extends Repository<Cheese> {}
