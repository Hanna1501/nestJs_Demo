import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Users, UsersDocument } from "src/schemas/Users.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AbstractRepository } from "src/common/repository/abstract.repository";

@Injectable()
export class UsersRepository  extends AbstractRepository<UsersDocument>{
    constructor(@InjectModel(Users.name) private usersModel: Model<UsersDocument>) {
        super(usersModel);
    }

//   async findAll(): Promise<Users[]> {
//     return await this.usersModel.find().exec();
//   }

//   async findOne(id: string): Promise<Users> {
//     const user = await this.usersModel.findById(id).exec();
//     if (!user) {
//       throw new NotFoundException(`User not found`);
//     }
//     return user;
//   }

//   async create(createUserDto: CreateUserDto): Promise<Users> {
//     const newUser = new this.usersModel(createUserDto);
//     return await newUser.save();
//   }

//   async update(id: string, updateUserDto: UpdateUserDto): Promise<Users> {
//     const updatedUser = await this.usersModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
//     if (!updatedUser) {
//       throw new NotFoundException(`User not found`);
//     }
//     return updatedUser;
//   }

//   async delete(id: string): Promise<{ message: string }> {
//     const deletedUser = await this.usersModel.findByIdAndDelete(id).exec();
//     if (!deletedUser) {
//       throw new NotFoundException(`User not found`);
//     }
//     return { message: 'User deleted successfully' };
//   }
}