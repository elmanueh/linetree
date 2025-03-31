import { TreeEntity } from '@genealogy/core/domain/tree.entity';
import { Repository } from '@genealogy/shared';

export abstract class TreeRepository extends Repository<TreeEntity> {}
