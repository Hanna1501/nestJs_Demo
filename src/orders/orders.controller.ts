import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrdersDto } from './dto/create-order.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  async createOrder(@Body() body: { userData: CreateUserDto; orderData: CreateOrdersDto }) {
    return this.ordersService.createOrderWithTransaction(body.userData, body.orderData);
  }

  // @UseGuards(AuthGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getPosts(
    @Query('limit') limit: number,
    @Query('lastId') lastId: string,
    @Query('startsWith') startsWith: string,
  ) {
    const parsedLimit = Math.min(Number(limit) || 10, 50);
    return this.ordersService.getOrders(parsedLimit, lastId, startsWith);
  }
}