import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthlogDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}