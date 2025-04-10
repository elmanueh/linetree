import { RelationEntity } from '@app/genealogy/core/domain/relation.entity';
import { Repository } from '@app/shared';
import { UUID } from 'crypto';

export abstract class RelationsRepository extends Repository<RelationEntity> {
  /**
   * Deletes all relations associated with a specific tree.
   * @param treeId - The UUID of the tree whose relations should be deleted
   * @returns A Promise that resolves when the deletion is complete
   */
  abstract deleteRelationsByTreeId(treeId: UUID): Promise<void>;

  /**
   * Deletes all relations associated with a specific node.
   * @param nodeId - The UUID of the node whose relations should be deleted
   * @returns A Promise that resolves when the deletion is complete
   */
  abstract deleteRelationsByNodeId(nodeId: UUID): Promise<void>;
}
