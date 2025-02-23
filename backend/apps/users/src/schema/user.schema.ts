import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop([String])
  trees: string[];

  constructor() {
    this.trees = [];
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
