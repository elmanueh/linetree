import { Entity } from '@app/shared';
import { NodeEntity } from '@genealogy-ms/core/domain/node.entity';
import { UUID } from 'crypto';

export interface TreeProps {
  name: string;
  nodes: NodeEntity[];
}

export class TreeEntity extends Entity<TreeProps> {
  private constructor(props: TreeProps, id?: UUID) {
    super(props, id);
  }

  static create(props: TreeProps, id?: UUID): TreeEntity {
    return new TreeEntity(props, id);
  }

  get name(): string {
    return this.props.name;
  }

  get nodes(): NodeEntity[] {
    return this.props.nodes || [];
  }

  addNode(node: NodeEntity): void {
    this.props.nodes.push(node);
  }

  getNode(nodeId: UUID): NodeEntity | undefined {
    return this.props.nodes.find((node) => node.id === nodeId);
  }

  getNodes(): NodeEntity[] {
    return this.props.nodes;
  }

  removeNode(nodeId: UUID): void {
    this.props.nodes = this.props.nodes.filter((node) => node.id !== nodeId);
  }
}
