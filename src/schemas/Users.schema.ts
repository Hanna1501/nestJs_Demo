import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Users {
  @Prop({unique: true})
  name: string;

  @Prop({required: true})
  email: string;

  @Prop({required: true})
  mobile: string;

  @Prop({ enum: ['user', 'Admin'] })
  role: 'Admin' | 'user';
}

export const UsersSchema = SchemaFactory.createForClass(Users);