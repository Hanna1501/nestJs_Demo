import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Get()   // GET /users
    findAll(){
        // return []
        return this.usersService.findAll()
    }

    // @Get()   // GET /users?role=value
    // findAll(@Query('role') role?: 'Admin' | 'user'){
    //     return []
    // }

    @Get(':id')   // GET /users/:id
    findOne(@Param('id', ParseIntPipe) id: number){
        // return {id}  //return id value
        return this.usersService.findOne(id)   //+ unary => convert to number
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
    create(@Body(ValidationPipe) createUserDto: CreateUserDto){    // read body of the request
        // return user
        return this.usersService.create(createUserDto)   //+ unary => convert to number
    }

    @Put(':id')   // GET /users/:id
    update(@Param('id') id: string, @Body(ValidationPipe) userUpdate: UpdateUserDto){
        return {id, ...userUpdate}  //return id value
    }

    @Delete(':id')   // GET /users/:id
    delete(@Param('id') id: string){
        return {id}  //return id value
    }
}
