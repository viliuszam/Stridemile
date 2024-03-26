import { IsNotEmpty, IsString, IsDecimal, IsOptional, IsNumber, IsDate, IsDateString, isString } from 'class-validator';

export class CreateStatisticsDto {
  @IsNotEmpty()
  @IsString()
  sleep: string;

  @IsNotEmpty()
  @IsString()
  calories: string;

  @IsNotEmpty()
  @IsString()
  macroelements: string;

  @IsNotEmpty()
  @IsString()
  water: string;

  @IsNotEmpty()
  @IsString()
  weight: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
