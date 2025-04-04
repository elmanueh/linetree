import { TreeEntity } from '@app/genealogy/core/domain/tree.entity';
import { Repository } from '@app/shared';

export abstract class TreeRepository extends Repository<TreeEntity> {}
