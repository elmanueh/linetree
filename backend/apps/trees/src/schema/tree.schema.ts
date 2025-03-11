import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID, UUID } from 'crypto';
import { HydratedDocument } from 'mongoose';

export type TreeDocument = HydratedDocument<Tree>;

@Schema()
export class Tree {
  @Prop({ type: String, default: randomUUID })
  _id: UUID;

  @Prop({ required: true })
  name: string;

  @Prop({ type: [String], default: [] })
  nodes: string[];
}

export const TreeSchema = SchemaFactory.createForClass(Tree);
