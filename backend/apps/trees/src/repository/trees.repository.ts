import { Repository } from '@genealogy/shared';
import { TreeEntity } from '../domain/tree.entity';

export abstract class TreeRepository extends Repository<TreeEntity> {}
