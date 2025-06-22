import { UUID } from 'crypto';

export class GetTreeDto {
  id: UUID;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  nodes: string[];
}
