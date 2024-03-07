import { IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class ActivityEntry {
  @IsNotEmpty()
  @IsNumber()
  steps: number;

  @IsNotEmpty()
  @IsNumber()
  distance: number;

  @IsNotEmpty()
  @IsDateString()
  start_time: Date;

  @IsNotEmpty()
  @IsDateString()
  end_time: Date;
}