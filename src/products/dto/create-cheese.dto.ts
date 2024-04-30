import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsUrl,
} from 'class-validator';
import { CheeseColor } from '../cheese-color.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCheeseDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  image: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Invalid price' })
  @IsPositive()
  price: number;

  @ApiProperty()
  @IsEnum(CheeseColor, { message: 'Valid cheese color required' })
  color: CheeseColor;
}
