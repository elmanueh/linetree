import { RelationType } from '@app/genealogy/core/domain/relation.enum';
import { Entity } from '@app/shared';
import { UUID } from 'crypto';

export interface RelationProps {
  souceNodeId: UUID;
  targetNodeId: UUID;
  type: RelationType;
  treeId: UUID;
}

export class RelationEntity extends Entity<RelationProps> {
  private constructor(props: RelationProps, id?: UUID) {
    super(props, id);
  }

  static create(props: RelationProps, id?: UUID): RelationEntity {
    return new RelationEntity(props, id);
  }

  get souceNodeId(): UUID {
    return this.props.souceNodeId;
  }

  get targetNodeId(): UUID {
    return this.props.targetNodeId;
  }

  get type(): RelationType {
    return this.props.type;
  }

  get treeId(): UUID {
    return this.props.treeId;
  }
}
