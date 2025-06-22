import { Repository } from '@app/shared';
import { TreeEntity } from '@genealogy-ms/core/domain/tree.entity';
import { UUID } from 'crypto';

export abstract class TreeRepository extends Repository<TreeEntity> {
  /**
   * Finds all trees owned by a specific owner.
   * @param owner - The UUID of the owner whose trees are to be found.
   * @returns A promise that resolves with an array of TreeEntity objects owned by the specified owner.
   */
  abstract findAllByOwner(owner: UUID): Promise<TreeEntity[]>;
}
