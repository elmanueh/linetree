import { Entity } from '@app/shared';
import { NodeEntity } from '@genealogy-ms/core/domain/node.entity';
import { UUID } from 'crypto';

export interface TreeProps {
  name: string;
  owner: UUID;
  nodes: NodeEntity[];
  createdAt?: Date;
  updatedAt?: Date;
}

export class TreeEntity extends Entity<TreeProps> {
  private constructor(props: TreeProps, id?: UUID) {
    super(
      {
        ...props,
        createdAt: props.createdAt || new Date(),
        updatedAt: props.updatedAt || new Date(),
        nodes: props.nodes || [],
      },
      id,
    );
  }

  static create(props: TreeProps, id?: UUID): TreeEntity {
    return new TreeEntity(props, id);
  }

  get name(): string {
    return this.props.name;
  }

  get nodes(): NodeEntity[] {
    return this.props.nodes;
  }

  get owner(): UUID {
    return this.props.owner;
  }

  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  set createdAt(date: Date | undefined) {
    this.props.createdAt = date;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  set updatedAt(date: Date | undefined) {
    this.props.updatedAt = date;
  }

  addNode(node: NodeEntity): void {
    this.props.nodes.push(node);
    this.updatedAt = new Date();
  }

  getNode(nodeId: UUID): NodeEntity | undefined {
    return this.props.nodes.find((node) => node.id === nodeId);
  }

  getNodes(): NodeEntity[] {
    return this.props.nodes;
  }

  removeNode(nodeId: UUID): void {
    this.props.nodes = this.props.nodes.filter((node) => node.id !== nodeId);
    this.updatedAt = new Date();
  }
}
