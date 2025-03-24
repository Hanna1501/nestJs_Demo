export class CreateUserDto {
    name: string;
    email: string;
    role: 'Admin' | 'user';
}
