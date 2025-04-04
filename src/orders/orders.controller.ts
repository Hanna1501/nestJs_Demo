import { Body, Controller, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrdersDto } from './dto/create-order.dto';
import { Types } from 'mongoose';
import { Orders } from 'src/schemas/Orders.schema';
import { Users } from 'src/schemas/Users.schema';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  async createOrder(@Body() body: {userData:Partial<Users>; orderData: Partial<Orders>}) {
    return this.ordersService.createOrder(body.userData, body.orderData);
  }
}