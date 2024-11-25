import { IsNotEmpty, IsString } from "class-validator";

export class AuthpassDto {
    @IsString()
    @IsNotEmpty()
    newPassword: string;
}