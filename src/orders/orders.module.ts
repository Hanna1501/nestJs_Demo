import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from './oders.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Orders, OrdersSchema } from 'src/schemas/Orders.schema';
import { Users, UsersSchema } from 'src/schemas/Users.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema },{ name: Orders.name, schema: OrdersSchema }])],
  providers: [OrdersService, OrdersRepository],
  controllers: [OrdersController]
})
export class OrdersModule { }
