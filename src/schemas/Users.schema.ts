import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

// export type UsersDocument = HydratedDocument<Users>;

export type UsersDocument = Users & Document; // Ensure it extends Document

@Schema()
export class Users {
  @Prop({unique: true, required: true})
  name: string;

  @Prop({unique: true, required: true})
  email: string;

  @Prop({required: true})
  mobile: string;

  @Prop({ enum: ['user', 'Admin'] })
  role: 'Admin' | 'user';
}

export const UsersSchema = SchemaFactory.createForClass(Users);