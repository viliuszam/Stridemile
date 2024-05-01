import { IsDecimal, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ItemCreateDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsDecimal()
    @IsNotEmpty()
    price: number;

    @IsString()
    @IsNotEmpty()
    category: string;
}