import { IsNotEmpty, IsString, IsOptional, IsNumber, IsDate, IsDateString } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  @IsString()
  location: Date;

  @IsNotEmpty()
  @IsNumber()
  fk_Category: number;

}