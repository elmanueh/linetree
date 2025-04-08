import { Entity } from '@app/shared';
import { UUID } from 'crypto';

export interface RelationProps {
  souceNodeId: UUID;
  targetNodeId: UUID;
  relationType: string;
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

  get relationType(): string {
    return this.props.relationType;
  }
}
