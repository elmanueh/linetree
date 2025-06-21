import { Repository } from '@app/shared';
import { NodeEntity } from '@genealogy-ms/core/domain/node.entity';

export abstract class NodeRepository extends Repository<NodeEntity> {}
