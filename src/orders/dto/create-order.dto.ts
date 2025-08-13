import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateOrdersDto {
    @IsString()
    @IsNotEmpty()
    productName: string;

    @IsNumber()
    price: number;

    @IsNotEmpty()
    userId: Types.ObjectId;
}