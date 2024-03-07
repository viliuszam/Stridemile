import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateGroupDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  mentorId: number;

  @IsNotEmpty()
  @IsNumber()
  visibilityId: number;
}