import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ClientSession, Model } from "mongoose";
import { Users, UsersDocument } from "src/schemas/Users.schema";
import { AbstractRepository } from "src/common/repository/abstract.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository extends AbstractRepository<UsersDocument> {
    constructor(@InjectModel(Users.name) private usersModel: Model<UsersDocument>) {
        super(usersModel);
    }
    async create(user: CreateUserDto, session?: ClientSession): Promise<UsersDocument> {
        const hashedPassword = await bcrypt.hash(user.password, 10);    //salt rounds 10
        const userData = { ...user, password: hashedPassword };
        if (session) {
            return new this.usersModel(userData).save({ session });
        }
        return new this.usersModel(userData).save();
    }
}