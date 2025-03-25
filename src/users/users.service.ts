import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from 'src/schemas/Users.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel(Users.name) private usersModel: Model<Users>) {}

    findAll(){
        // return this.users
        return this.usersModel.find()
    }

    // findOne(id: number){
    //     const user = this.users.find(user => user.id === id)
    //     if(!user)
    //         throw new NotFoundException('User not found')
    //     return user
    // }

    findOne(id: string){
        const user = this.usersModel.findById(id)
        // if(!user)
        //     throw new NotFoundException('User not found')
        return user
    }

    create(createUserDto : CreateUserDto){
        // const usersByHighestId = [...this.users].sort((a,b)=> b.id = a.id);
        // const newUser = {
        //     id: usersByHighestId[0].id +1,
        //     ...createUserDto
        // }
        // this.users.push(newUser)
        const newUser = new this.usersModel(createUserDto)
        return newUser.save()
    }
}
