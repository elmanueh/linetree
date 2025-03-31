import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID, UUID } from 'crypto';
import { HydratedDocument } from 'mongoose';

export type NodeDocument = HydratedDocument<Node>;

@Schema()
export class Node {
  @Prop({ type: String, default: randomUUID })
  _id: UUID;

  @Prop({ required: true })
  name: string;
}

export const NodeSchema = SchemaFactory.createForClass(Node);
