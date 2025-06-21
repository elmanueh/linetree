import { Entity } from '@app/shared';
import { RelationType } from '@genealogy-ms/core/domain/relation.enum';
import { UUID } from 'crypto';

export interface RelationProps {
  sourceNodeId: UUID;
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

  get sourceNodeId(): UUID {
    return this.props.sourceNodeId;
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
