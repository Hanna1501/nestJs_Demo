import { ClientSession, FilterQuery, QueryWithHelpers } from 'mongoose';
import { OrdersDocument } from 'src/schemas/Orders.schema';

export interface IOrderRepository {
  create(orderData: Partial<OrdersDocument>, session?: ClientSession): Promise<OrdersDocument>;

  find(
    filter: FilterQuery<OrdersDocument>
  ): QueryWithHelpers<OrdersDocument[], OrdersDocument>;

  // countDocuments(
  //   filter: FilterQuery<OrdersDocument>
  // ): Promise<number>;
}