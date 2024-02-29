import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthForgDto {
  @IsString()
  @IsNotEmpty()
  email: string;
}