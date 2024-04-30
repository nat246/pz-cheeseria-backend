import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsUrl,
} from 'class-validator';
import { CheeseColor } from '../cheese-color.enum';

export class CreateCheeseDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsUrl()
  image: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Invalid price' })
  @IsPositive()
  price: number;

  @IsEnum(CheeseColor, { message: 'Valid cheese color required' })
  color: CheeseColor;
}
