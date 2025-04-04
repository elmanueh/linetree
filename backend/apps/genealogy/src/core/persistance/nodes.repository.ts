import { NodeEntity } from '@app/genealogy/core/domain/node.entity';
import { Repository } from '@app/shared';

export abstract class NodeRepository extends Repository<NodeEntity> {}
