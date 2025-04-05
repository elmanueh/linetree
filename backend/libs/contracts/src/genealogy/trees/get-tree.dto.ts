import { UUID } from 'crypto';

export class GetTreeDto {
  id: UUID;
  name: string;
  nodes: string[];
}
