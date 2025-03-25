import { Repository } from '@genealogy/shared';
import { NodeEntity } from '../domain/node.entity';

export abstract class NodeRepository extends Repository<NodeEntity> {}
