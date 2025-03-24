import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';

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
    create(@Body() user: {name: string, email: string, role: 'Admin' | 'user'}){    // read body of the request
        // return user
        return this.usersService.create(user)   //+ unary => convert to number
    }

    @Put(':id')   // GET /users/:id
    update(@Param('id') id: string, @Body() userUpdate: {}){
        return {id, ...userUpdate}  //return id value
    }

    @Delete(':id')   // GET /users/:id
    delete(@Param('id') id: string){
        return {id}  //return id value
    }
}
