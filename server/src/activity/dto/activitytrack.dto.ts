import { IsNotEmpty, IsNumber, IsPositive, IsDateString } from 'class-validator';

export class ActivityEntry {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  steps: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  distance: number;

  @IsNotEmpty()
  @IsDateString()
  start_time: Date;

  @IsNotEmpty()
  @IsDateString()
  end_time: Date;
}