import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './oders.repository';
import { Orders } from 'src/schemas/Orders.schema';
import { Users } from 'src/schemas/Users.schema';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async createOrder(userData:Partial<Users>, orderData: Partial<Orders>): Promise<Orders> {
    return this.ordersRepository.createOrderWithTransaction(userData,orderData);
  }
}