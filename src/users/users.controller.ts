import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import mongoose from 'mongoose';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()   // GET /users
    findAll() {
        // return []
        return this.usersService.findAll()
    }

    // @Get()   // GET /users?role=value
    // findAll(@Query('role') role?: 'Admin' | 'user'){
    //     return []
    // }

    // @Get(':id')   // GET /users/:id
    // findOne(@Param('id', ParseIntPipe) id: number){
    //     // return {id}  //return id value
    //     return this.usersService.findOne(id)   //+ unary => convert to number
    // }

    @Get(':id')   // GET /users/:id
    async findOne(@Param('id') id: string) {
        // const isValid = mongoose.Types.ObjectId.isValid(id);
        // if (!isValid) throw new NotFoundException('User not found')

        // const findUser = this.usersService.findOne(id)   //+ unary => convert to number
        // // if (!findUser)
        // //     throw new HttpException('User not found', 404)
        // return findUser
        try {
            await this.usersService.findOne(id)
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'This is a custom message',
            }, HttpStatus.FORBIDDEN, {
                cause: error
            });
        }
    }

    // findOne(@Param('id') id: string){
    //     // return {id}  //return id value
    //     return this.usersService.findOne(+id)   //+ unary => convert to number
    // }

    // @Get('interns')   // GET /users/:id
    // findAllInterns(){
    //     return []  // if write after the above crud operation, it returns "id: interns" instead of []. So use it before above operation
    // }

    @Post()
    create(@Body(ValidationPipe) createUserDto: CreateUserDto) {    // read body of the request
        // return user
        return this.usersService.create(createUserDto)   //+ unary => convert to number
    }

    @Put(':id')   // GET /users/:id
    update(@Param('id') id: string, @Body(ValidationPipe) userUpdate: UpdateUserDto) {
        return { id, ...userUpdate }  //return id value
    }

    @Delete(':id')   // GET /users/:id
    delete(@Param('id') id: string) {
        return { id }  //return id value
    }
}
