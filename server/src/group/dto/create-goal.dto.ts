import { IsNotEmpty, IsString, IsOptional, IsNumber, IsDate, IsDateString } from 'class-validator';

export class CreateGoalDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDateString()
  start_date: Date;

  @IsNotEmpty()
  @IsDateString()
  end_date: Date;

  @IsOptional()
  @IsString()
  target_value?: number;

  @IsNumber()
  statusId?: number;

  @IsNumber()
  categoryId?: number;
}