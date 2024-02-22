import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthlogDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}