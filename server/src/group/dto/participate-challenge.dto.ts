import { IsNotEmpty,  IsNumber } from 'class-validator';

export class ParticipateChallengeDto {
  @IsNotEmpty()
  @IsNumber()
  challengeId: number;
}