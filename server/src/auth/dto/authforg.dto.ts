import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthForgDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}