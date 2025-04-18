import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { ClientSession, Connection, FilterQuery, Model, Types } from "mongoose";
import { AbstractRepository } from "src/common/repository/abstract.repository";
import { Orders, OrdersDocument } from "src/schemas/Orders.schema";
import { Users, UsersDocument } from "src/schemas/Users.schema";
import { CreateOrdersDto } from "./dto/create-order.dto";
import { IOrderRepository } from "./interfaces/orders.interface";

@Injectable()
export class OrdersRepository extends AbstractRepository<OrdersDocument> implements IOrderRepository {
    constructor(
        @InjectModel(Orders.name) private ordersModel: Model<OrdersDocument>,
        @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
        @InjectConnection() private readonly connection: Connection, // Inject MongoDB connection
    ) {
        super(ordersModel);
    }
    async create(order: CreateOrdersDto, session?: ClientSession): Promise<OrdersDocument> {
        if (session) {
            return new this.ordersModel(order).save({ session });
        }
        return new this.ordersModel(order).save();
    }

    find(filter: FilterQuery<OrdersDocument>) {
        return this.ordersModel.find(filter);
    }

    // async countDocuments(filter: FilterQuery<OrdersDocument>): Promise<number> {
    //     return this.ordersModel.countDocuments(filter).exec();
    // }
    // async createOrderWithTransaction(userData: Partial<Users>, orderData: Partial<Orders>): Promise<OrdersDocument> {
    //     const session: ClientSession = await this.connection.startSession();
    //     session.startTransaction();

    //     try {
    //         const userData = {
    //             "name": "avgfhyy",
    //             "email": "aggy@gmail.com",
    //             "mobile": "778987766",
    //             "role": "Admin"
    //         }

    //         const savedUser = await new this.usersModel(userData).save({ session });
    //         // if(savedUser) {
    //         //     console.log(savedUser)
    //         //     // orderData.userId = savedUser._id
    //         //     return {} as OrdersDocument
    //         // }
    //         if (!savedUser) {
    //             throw new Error("User creation failed"); // Scenario 2: User creation failed
    //         }
    //         console.log("User created successfully:", savedUser);

    //         //  Assign the created user's _id to the order
    //         orderData.userId = savedUser._id;

    //         const savedOrder = await new this.ordersModel(orderData).save({ session });
    //         if (!savedOrder) {
    //             throw new Error("Order creation failed"); // Scenario 3: Order creation failed
    //         }
    //         console.log("Order created successfully:", savedOrder);
    //         await session.commitTransaction();
    //         return savedOrder;
    //     } catch (error) {
    //         console.error(`Transaction failed: ${error.message}`);

    //         await session.abortTransaction(); //roll back operations
    //         console.error(`Transaction failed: ${error.message}`);
    //         throw new BadRequestException(`Transaction failed: ${error.message}`);
    //     } finally {
    //         session.endSession(); // close the section(prevent memory leaks)
    //     }
    // }
}