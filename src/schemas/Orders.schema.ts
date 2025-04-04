import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument, Types } from "mongoose";

export type OrdersDocument = Orders & Document & { _id: Types.ObjectId };

@Schema()
export class Orders {
  @Prop({ required: true})
  productName: string;

  @Prop({required: true})
  price: number;

  @Prop({type: Types.ObjectId, ref: 'Users', required: true})
  userId: Types.ObjectId; // Foreign key reference to Users
}

export const OrdersSchema = SchemaFactory.createForClass(Orders);