import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateOrdersDto {
    @IsString()
    @IsNotEmpty()
    productName: string;

    @IsNumber()
    price: number;

    userId: string;
}