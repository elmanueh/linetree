import { TreeEntity } from '../domain/tree.entity';
import { Repository } from './repository';

export abstract class TreeRepository extends Repository<TreeEntity> {}
