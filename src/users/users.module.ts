import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from 'src/schemas/Users.schema';
import { UsersRepository } from './users.repository';

@Module({
    imports:[MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }])],
    controllers: [UsersController],
    providers: [UsersService, UsersRepository],
    exports: [UsersRepository]
})
export class UsersModule { }
