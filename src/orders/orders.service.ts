import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { OrdersRepository } from './oders.repository';
import { Orders } from 'src/schemas/Orders.schema';
import { Users } from 'src/schemas/Users.schema';
import { UsersRepository } from 'src/users/users.repository';
import { InjectConnection } from '@nestjs/mongoose';
import { ClientSession, Connection } from 'mongoose';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CreateOrdersDto } from './dto/create-order.dto';
import { IOrderRepository } from './interfaces/orders.interface';
import { IUserRepository } from 'src/users/interfaces/user.interface';

@Injectable()
export class OrdersService {
    constructor(
        @Inject('IUserRepository') private readonly usersRepository: IUserRepository,
        @Inject('IOrderRepository') private readonly ordersRepository: IOrderRepository,
        @InjectConnection() private readonly connection: Connection, // Inject MongoDB connection
    ) { }

    // async createOrder(userData: Partial<Users>, orderData: Partial<Orders>): Promise<Orders> {
    //   return this.ordersRepository.createOrderWithTransaction(userData, orderData);
    // }

    async createOrderWithTransaction(userData: CreateUserDto, orderData: CreateOrdersDto) {
        const session: ClientSession = await this.connection.startSession();
        session.startTransaction();

        try {
            const userData = {
                "name": "user2",
                "email": "aggy@gmail.com",
                "mobile": "778987766",
                "role": "Admin"
            }

            const savedUser = await this.usersRepository.create(userData as CreateUserDto, session);
            // if(savedUser) {
            //     console.log(savedUser)
            //     // orderData.userId = savedUser._id
            //     return {} as OrdersDocument
            // }
            if (!savedUser) {
                throw new Error("User creation failed"); // Scenario 2: User creation failed
            }
            console.log("User created successfully:", savedUser);

            //  Assign the created user's _id to the order
            orderData.userId = savedUser._id;

            const savedOrder = await this.ordersRepository.create(orderData, session);
            if (!savedOrder) {
                throw new Error("Order creation failed"); // Scenario 3: Order creation failed
            }
            console.log("Order created successfully:", savedOrder);
            await session.commitTransaction();
            return savedOrder;
        } catch (error) {
            console.error(`Transaction failed: ${error.message}`);

            await session.abortTransaction(); //roll back operations
            console.error(`Transaction failed: ${error.message}`);
            throw new BadRequestException(`Transaction failed: ${error.message}`);
        } finally {
            session.endSession(); // close the section(prevent memory leaks)
        }
    }

    async getOrders(limit = 10, lastId?: string, startsWith?: string) {
        // async getOrders(page = 1, limit = 10, startsWith?: string) {
        const query: any = {};

        // Add filter for "starts with"
        if (startsWith) {
            query.productName = { $regex: `^${startsWith}`, $options: 'i' }; // case-insensitive
        }

        if (lastId) {
            query._id = { $lt: lastId }; // Fetch orders older than last one
        }

        // const skip = (page - 1) * limit;

        const orders = await this.ordersRepository
            .find(query)
            .sort({ _id: -1 }) // newest first
            // .skip(skip)
            .limit(limit)
            .exec();

        // const total = await this.ordersRepository.countDocuments(query);

        // return {
        //     orders,
        //     currentPage: page,
        //     totalPages: Math.ceil(total / limit),
        //     totalRecords: total,
        //   };
        return orders;
    }
}