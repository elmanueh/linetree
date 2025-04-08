import { RelationEntity } from '@app/genealogy/core/domain/relation.entity';
import { Repository } from '@app/shared';

export abstract class RelationsReposity extends Repository<RelationEntity> {}
