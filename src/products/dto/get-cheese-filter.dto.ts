import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CheeseColor } from '../cheese-color.enum';
import { ApiProperty } from '@nestjs/swagger';

export class GetCheesesFilterDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(CheeseColor)
  color?: CheeseColor;
}
