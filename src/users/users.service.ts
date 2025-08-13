import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from 'src/schemas/Users.schema';
import { Model } from 'mongoose';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) { }

    findAll() {
        return this.usersRepository.findAll()
    }

    findOne(id: string) {
        return this.usersRepository.findOne({ _id: id })
    }

    create(createUserDto: CreateUserDto) {
        return this.usersRepository.create(createUserDto)
    }

    async findByEmail(email: string) {
        return this.usersRepository.findOne({ email });
    }
}
