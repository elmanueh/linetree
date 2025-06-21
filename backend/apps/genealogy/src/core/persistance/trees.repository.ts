import { Repository } from '@app/shared';
import { TreeEntity } from '@genealogy-ms/core/domain/tree.entity';

export abstract class TreeRepository extends Repository<TreeEntity> {}
