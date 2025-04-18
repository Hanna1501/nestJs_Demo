import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ClientSession, Model } from "mongoose";
import { Users, UsersDocument } from "src/schemas/Users.schema";
import { AbstractRepository } from "src/common/repository/abstract.repository";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersRepository extends AbstractRepository<UsersDocument> {
    constructor(@InjectModel(Users.name) private usersModel: Model<UsersDocument>) {
        super(usersModel);
    }
    async create(user: CreateUserDto, session?: ClientSession): Promise<UsersDocument> {
        if (session) {
            return new this.usersModel(user).save({ session });
        }
        return new this.usersModel(user).save();
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