import { RelationEntity } from '@app/genealogy/core/domain/relation.entity';
import { Repository } from '@app/shared';

export abstract class RelationsRepository extends Repository<RelationEntity> {}
