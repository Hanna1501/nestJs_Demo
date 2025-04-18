import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from './oders.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Orders, OrdersSchema } from 'src/schemas/Orders.schema';
import { Users, UsersSchema } from 'src/schemas/Users.schema';
import { UsersRepository } from 'src/users/users.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }, { name: Orders.name, schema: OrdersSchema }])],
  providers: [OrdersService,
    { provide: 'IUserRepository', useClass: UsersRepository },
    { provide: 'IOrderRepository', useClass: OrdersRepository }
  ],
  controllers: [OrdersController]
})
export class OrdersModule { }
