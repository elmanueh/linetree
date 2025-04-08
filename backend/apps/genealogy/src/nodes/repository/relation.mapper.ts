import { RelationEntity } from '@app/genealogy/core/domain/relation.entity';
import { Mapper } from '@app/shared';

export class RelationPersistanceMapper extends Mapper<RelationEntity, void> {
  domain2Persistance(entity: RelationEntity): void {
    throw new Error('Method not implemented.');
  }

  persistance2Domain(document: void): RelationEntity {
    throw new Error('Method not implemented.');
  }
}
