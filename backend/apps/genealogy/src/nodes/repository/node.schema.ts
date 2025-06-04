import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID, UUID } from 'crypto';
import { HydratedDocument } from 'mongoose';

export type NodeDocument = HydratedDocument<Node>;

@Schema()
export class Node {
  @Prop({ type: String, default: randomUUID })
  _id: UUID;

  @Prop()
  address?: string;

  @Prop()
  birthDate?: Date;

  @Prop()
  birthPlace?: string;

  @Prop()
  deathDate?: Date;

  @Prop()
  deathPlace?: string;

  @Prop()
  email?: string;

  @Prop()
  familyName?: string;

  @Prop()
  gender: string;

  @Prop()
  givenName: string;

  @Prop()
  nationality?: string;

  @Prop()
  telephone?: string;
}

export const NodeSchema = SchemaFactory.createForClass(Node);
