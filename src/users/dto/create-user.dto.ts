import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    mobile: string;

    @IsEnum(['user', 'Admin'], {
        message: 'Valid role required'
    })
    role: 'Admin' | 'user';
}
