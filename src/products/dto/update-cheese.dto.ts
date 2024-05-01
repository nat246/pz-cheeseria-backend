import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, IsUrl } from 'class-validator';

export class UpdateCheeseDto {
  @ApiProperty()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsUrl()
  image: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @IsPositive()
  price: number;
}
