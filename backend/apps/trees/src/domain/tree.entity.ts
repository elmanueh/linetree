import { UUID } from 'crypto';
import { Entity } from './entity';

export interface TreeProps {
  name: string;
  nodes?: string[];
}

export class TreeEntity extends Entity<TreeProps> {
  private constructor(props: TreeProps, id?: UUID) {
    super(props, id);
  }

  get name(): string {
    return this.props.name;
  }

  get nodes(): string[] {
    return this.props.nodes || [];
  }

  static create(props: TreeProps, id?: UUID): TreeEntity {
    return new TreeEntity(props, id);
  }
}
