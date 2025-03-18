import { UUID } from 'crypto';

export abstract class Repository<T> {
  /**
   * Saves an entity in the repository.
   * @param entity - The entity to be saved.
   * @returns A promise that resolves when the entity is saved.
   */
  abstract save(entity: T): Promise<void>;

  /**
   * Deletes an entity from the repository.
   * @param id - The UUID of the entity to be deleted.
   * @returns A promise that resolves when the entity is deleted.
   */
  abstract delete(id: UUID): Promise<void>;

  /**
   * Finds an entity by its id in the repository.
   * @param id - The UUID of the entity to be found.
   * @returns A promise that resolves with the found entity.
   */
  abstract findById(id: UUID): Promise<T>;

  /**
   * Finds all entities in the repository.
   * @returns A promise that resolves with an array of entities.
   */
  abstract findAll(): Promise<T[]>;
}
