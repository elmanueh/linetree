import { Entity } from '@app/shared';
import { UUID } from 'crypto';

export interface NodeProps {
  name: string;
}

export class NodeEntity extends Entity<NodeProps> {
  private constructor(props: NodeProps, id?: UUID) {
    super(props, id);
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  static create(props: NodeProps, id?: UUID): NodeEntity {
    return new NodeEntity(props, id);
  }
}
