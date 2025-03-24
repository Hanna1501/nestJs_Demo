import { IsEmail, IsEmpty, IsEnum, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsEnum(['user', 'Admin'], {
        message: 'Valid role required'
    })
    role: 'Admin' | 'user';
}
