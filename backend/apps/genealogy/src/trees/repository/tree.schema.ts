import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { HydratedDocument } from 'mongoose';

export type TreeDocument = HydratedDocument<Tree>;

@Schema()
export class Tree {
  @Prop({ type: String, default: randomUUID })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: [String], default: [] })
  nodes: string[];

  @Prop({ type: String })
  owner: string;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;
}

export const TreeSchema = SchemaFactory.createForClass(Tree);
