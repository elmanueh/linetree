import { RelationEntity } from '@app/genealogy/core/domain/relation.entity';
import { Repository } from '@app/shared';
import { UUID } from 'crypto';

export abstract class RelationsRepository extends Repository<RelationEntity> {
  /**
   * Deletes all relations associated with a specific tree.
   * @param treeId - The UUID of the tree whose relations should be deleted
   * @returns A Promise that resolves when the deletion is complete
   */
  abstract deleteByTreeId(treeId: UUID): Promise<void>;

  /**
   * Deletes all relations associated with a specific node and descendants.
   * @param nodeId - The UUID of the node whose relations should be deleted
   * @returns A Promise that resolves when the deletion is complete
   */
  abstract deleteByNodeId(nodeId: UUID): Promise<void>;

  /**
   * Retrieves all relations associated with a specific tree.
   * @param treeId - The UUID of the tree whose relations should be retrieved
   * @returns A Promise that resolves to an array of RelationEntity objects associated with the specified tree
   */
  abstract findByTreeId(treeId: UUID): Promise<RelationEntity[]>;

  /**
   * Retrieves all relations associated with a specific node and its descendants.
   * @param treeId - The UUID of the tree to which the node belongs
   * @param nodeId - The UUID of the node whose relations should be retrieved
   * @returns A Promise that resolves to an array of RelationEntity objects associated with the specified node
   */
  abstract findDescendantsByNodeId(
    treeId: UUID,
    nodeId: UUID,
  ): Promise<RelationEntity[]>;

  /**
   * Retrieves genealogy data for a specific tree in a formatted string representation.
   * @param treeId - The UUID of the tree whose genealogy data should be retrieved
   * @returns A string representation of the genealogy data for the specified tree
   */
  abstract findGenealogy(treeId: UUID): Promise<object>;
}
