import { NodeEntity } from '@genealogy/core/domain/node.entity';
import { Repository } from '@genealogy/shared';

export abstract class NodeRepository extends Repository<NodeEntity> {}
