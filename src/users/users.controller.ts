import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {

    @Get()   // GET /users
    findAll(){
        return []
    }

    // @Get()   // GET /users?role=value
    // findAll(@Query('role') role?: 'Admin' | 'user'){
    //     return []
    // }

    @Get(':id')   // GET /users/:id
    findOne(@Param('id') id: string){
        return {id}  //return id value
    }

    // @Get('interns')   // GET /users/:id
    // findAllInterns(){
    //     return []  // if write after the above crud operation, it returns "id: interns" instead of []. So use it before above operation
    // }

    @Post()
    create(@Body() user: {name: string, email: string, role: 'Admin' | 'user'}){    // read body of the request
        return user
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
