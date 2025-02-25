import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Tree {
  @Prop()
  id: string;

  @Prop()
  name: string;

  constructor() {}
}

export const TreeSchema = SchemaFactory.createForClass(Tree);
