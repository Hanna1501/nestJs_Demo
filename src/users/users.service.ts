import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users= [
        {
            id: 1,
            name: 'Hanna',
            email: 'hanna@gmail.com',
            role: 'Admin'
        }
    ]

    findAll(){
        return this.users
    }

    findOne(id: number){
        const user = this.users.find(user => user.id === id)

        return user
    }

    create(user :{ name: string, email: string, role: 'Admin' | 'user'}){
        const usersByHighestId = [...this.users].sort((a,b)=> b.id = a.id);
        const newUser = {
            id: usersByHighestId[0].id +1,
            ...user
        }
        this.users.push(newUser)
        return newUser
    }
}
